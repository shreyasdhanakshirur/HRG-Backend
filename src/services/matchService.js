const Ball = require('../models/Ball');
const Match = require('../models/Match');

function sum(arr, fn = x => x) { return arr.reduce((s, v) => s + fn(v), 0); }

async function computeMatchSummary(matchId) {
  const match = await Match.findById(matchId).populate('teamA teamB');
  if (!match) throw new Error('Match not found');

  const balls = await Ball.find({ match: matchId }).sort({ inning: 1, over: 1, ballInOver: 1 }).populate('batsman bowler wicket.playerOut');

  const innings = {};
  for (const b of balls) {
    const inn = b.inning || 1;
    if (!innings[inn]) {
      innings[inn] = { balls: [], totalRuns: 0, wickets: 0, batsmen: {}, bowlers: {} };
    }
    const total = (b.runsBatsman || 0) + (b.extrasRuns || 0);
    innings[inn].balls.push(b);
    innings[inn].totalRuns += total;
    if (b.wicket && b.wicket.playerOut) innings[inn].wickets += 1;

    // batting
    const batId = String(b.batsman);
    if (!innings[inn].batsmen[batId]) innings[inn].batsmen[batId] = { runs:0, balls:0, fours:0, sixes:0, player: b.batsman };
    innings[inn].batsmen[batId].runs += (b.runsBatsman || 0);
    if (b.isLegal) innings[inn].batsmen[batId].balls += 1;
    if ((b.runsBatsman || 0) === 4) innings[inn].batsmen[batId].fours += 1;
    if ((b.runsBatsman || 0) === 6) innings[inn].batsmen[batId].sixes += 1;

    // bowling
    const bowlId = String(b.bowler);
    if (!innings[inn].bowlers[bowlId]) innings[inn].bowlers[bowlId] = { runs:0, oversBalls:0, wickets:0, player: b.bowler };
    innings[inn].bowlers[bowlId].runs += (b.runsBatsman || 0) + (b.extrasRuns || 0);
    if (b.isLegal) innings[inn].bowlers[bowlId].oversBalls += 1;
    if (b.wicket && b.wicket.playerOut) innings[inn].bowlers[bowlId].wickets += 1;
  }

  // convert oversBalls to overs.balls string
  const result = { match: match, innings: {} };
  for (const key of Object.keys(innings)) {
    const inn = innings[key];
    const batsmen = Object.values(inn.batsmen).map(b => ({ player: b.player, runs: b.runs, balls: b.balls, fours: b.fours, sixes: b.sixes }));
    const bowlers = Object.values(inn.bowlers).map(b => ({ player: b.player, runs: b.runs, overs: `${Math.floor(b.oversBalls/6)}.${b.oversBalls%6}`, wickets: b.wickets }));
    const ballsBowled = sum(inn.balls, b => b.isLegal ? 1 : 0);
    const oversCompleted = `${Math.floor(ballsBowled/6)}.${ballsBowled%6}`;
    const runRate = ballsBowled === 0 ? 0 : (inn.totalRuns / (ballsBowled/6));

    result.innings[key] = {
      totalRuns: inn.totalRuns,
      wickets: inn.wickets,
      overs: oversCompleted,
      runRate: Number(runRate.toFixed(2)),
      batting: batsmen,
      bowling: bowlers
    };
  }

  // basic result determination if two innings
  if (Object.keys(result.innings).length >= 2) {
    const a = result.innings['1'].totalRuns || 0;
    const b = result.innings['2'].totalRuns || 0;
    if (a > b) result.result = `${match.teamA.name || 'TeamA'} won by ${a-b} runs`;
    else if (b > a) result.result = `${match.teamB.name || 'TeamB'} won by ${10 - (result.innings['2'].wickets||0)} wickets`;
    else result.result = 'Match tied';
  }

  return result;
}

module.exports = { computeMatchSummary };
