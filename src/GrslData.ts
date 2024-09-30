import { 
  fields,
  fieldLining,
  schedule, 
  playDates,
  seasons, 
  standings,
  teams,
 } from './assets/teamsGames.json';

 import {
  cards,
  goals,
  players
 } from './assets/playerData.json'

export interface Card {
  player: Player,
  game: Game,
  color: string,
  code: string,
  paid: boolean,
  comment: string| null,
  team: Team | null
}

// from CRSchedule and CRTSchedule tables
export interface Game {
  _id: number,
  gameTime: Date,
  date: Date,
  playDate: PlayDate,
  homeTeam: Team,
  awayTeam: Team,
  homeScore: number | null,
  awayScore: number | null,
  forfeit: boolean,
  field: Field,
  division: Division,
  recorded: boolean,
  gameType: GameType,
  tournament: boolean,
  goals: Goal[],
  cards: Card[],
  season: Season
}

export interface Goal {
  player: Player,
  game: Game,
  team: Team | null,
  count: number
}

export interface Field {
  _id: number,  // fid
  code: string,  // name
  name: string, // lname
  url: string | null // maplink
}

export interface FieldLining {
  _id: number,
  date: Date,
  team1: Team,
  team2: Team | null,
  location: string,
  season: Season
}


export interface PlayDate {
  _id: number, // pdid
  date: Date, // gameDate
  dateStr: string, // gameDate as string
  gType: number, // tgame
  title: string, // gameName
  comments: string | null, // comments
  season?: Season
}

export interface Player {
  _id: number,  // pid
  passId: string,  // pass-id
  firstName: string, // FName
  lastName: string, // LName
  name: string,  // Fname LName
  gender: string // gen 
}

// from CRTeams
export interface Team {
  _id: number,
  name: string,
  code: string,
  captain1: Player | null,
  captain2: Player | null,
  jersey1: string | null, 
  jersey2: string | null,
  shorts1: string | null,
  shorts2: string | null,
  active: boolean,
  rating: number,
  activeRank: number,
  rank: number,
  wins: number,
  losses: number,
  draws: number,
  seasons: Season[]
}

// from seaasons
export interface Season {
  _id: number,
  name: string,
  code: string,
  start: Date,
  end: Date,
  rosterLimit: number,
  hasTournament: boolean,
  comment: string | null,
  location: string,
  games: Game[],
  standings: { [key in Division]: Standings[] },
  tournamentStandings: { [key in Division]: { [key: string]: Standings[] }},
  goals: Goal[],
  cards: Card[]
}


// for iterating through standings and tournamentStandings in a single list
export interface Season2 {
  code: string,
  name: string,
  tournament: boolean,
  season: Season
}

export interface Standings {
  team: Team,
  seed: number,
  rank: number
  wins: number,
  losses: number,
  draws: number,
  penaltyPoints: number,
  goalsFor: number,
  goalsAgainst: number,
  goalDifference: number,
  tiebreaker: number,
  points: number
}


type Division = "a" | "b" | "c";
type GameType = "r" | "s" | "f" | "t" | "";

export interface LeagueData {
  'seasons': { [key: number]: Season },
  'seasons2': Season2[],
  'teams': { [key: number]: Team },
  'games': { [key: number]: Game },
  'fields': { [key: number]: Field },
  'fieldLining': FieldLining[],
  'players': { [key: number]: Player},
  'years': number[],
  'playDates': { [key: number]: PlayDate },
}

let _grslData: LeagueData | null = null;

export function getPlayerData(): LeagueData {
  if (!_grslData) {
    _grslData = getData();
  }

  if (_grslData.seasons[32].cards.length > 0) {
    return _grslData;
  }

  let gPlayers = _grslData.players;
  let gGames = _grslData.games;
  let gTeams = _grslData.teams;

  for (let c of cards) {
    let gc: Card = {
      player: gPlayers[c.pid],
      game: gGames[c.gid],
      color: c.color,
      code: c.type,
      paid: c.paid,
      comment: c.comment,
      team: c.tid ? gTeams[c.tid] : null
    } 

    gc.game.season.cards.push(gc);
    gc.game.cards.push(gc);
  }

  for (let g of goals) {
    let gg: Goal = {
      player: gPlayers[g.pid],
      game: gGames[g.gid],
      team: g.tid ? gTeams[g.tid] : null,
      count: g.numG
    }

    gg.game.season.goals.push(gg);
    gg.game.goals.push(gg);
  }

  return _grslData;
}


export function getData(): LeagueData {
  if (_grslData) {
    return _grslData;
  }

  let gYears: number[] = []
  let gSeasons: { [key: number]: Season } = {};
  for (let s of seasons) {
    let end = new Date(s.end);
    let code = s.name.substring(0, 2).toLowerCase() + end.getFullYear(); 
    let gs: Season = {
      _id: s.sid,
      name: s.name,
      code: code,
      start: new Date(s.start),
      end: end,
      rosterLimit: s.rosterLimit,
      hasTournament: s.Tournament,
      comment: s.comments,
      location: s.location,
      games: [],
      standings: { a: [], b: [], c: []},
      tournamentStandings: { a: {}, b: {}, c: {}},
      goals: [],
      cards: [] 
    };
    gSeasons[gs._id] = gs;
    if (gs.end.getFullYear() && !gYears.includes(gs.end.getFullYear())) {
      gYears.push(gs.end.getFullYear())
    }
  }
  gYears.sort((a, b) => a < b ? 1 : -1);

  // seasons2
  let gSeasons2: Season2[] = [];
  for (let s of Object.values(gSeasons)) {
    let gs2: Season2 = {
      code: s.code,
      name: s.name,
      tournament: false,
      season: s
    }

    gSeasons2.push(gs2);

    if (s.hasTournament) {
      let gs2t: Season2 = {
        code: s.code + "T",
        name: s.name + " Tournament",
        tournament: true,
        season: s
      }

      gSeasons2.push(gs2t);
    }
  }


  let gPlayDates: { [key: number]: PlayDate } = {};
  for (let pd of playDates) {
    let pds = gSeasons[pd.sid];
    let gpd: PlayDate = {
      _id: pd.pdid,
      date: new Date(pd.gameDate + "T00:00:00"), // add T00:00:00 to force local timezone
      dateStr: pd.gameDate,
      gType: pd.tgame,
      title: pd.gameName,
      comments: pd.comments,
      season: pds
    };
    gPlayDates[gpd._id] = gpd
  }

  let gPlayers: { [key: number]: Player } = {};
  for (let p of players) {
    let gp = {
      _id: p.pid,
      passId: p['pass-id'],
      firstName: p.FName,
      lastName: p.LName,
      name: p.FName + " " + p.LName,
      gender: p.gen
    }
    gPlayers[gp._id] = gp;
  }

  let gFields: { [key: number]: Field } = {};
  let gFieldsByCode: { [key: string]: Field } = {}; 
  for (let f of fields) {
    let gf = {
      _id: f.fid,
      code: f.name,
      name: f.lname ? f.lname : f.name,
      url: f.maplink
    }

    gFields[gf._id] = gf;
    gFieldsByCode[gf.code] = gf;
  }

  let gTeams: { [key: number]: Team } = {};
  for (let t of teams) {
    gTeams[t.teamid] = {
      _id: t.teamid,
      name: t.teamname,
      code: t.code,
      captain1: t.captain1 ? gPlayers[t.captain1] : null,
      captain2: t.captain2 ? gPlayers[t.captain2] : null,
      jersey1: t.jersey1,
      jersey2: t.jersey2,
      shorts1: t.shorts1,
      shorts2: t.shorts2,
      active: t.active,
      rating: t.rating,
      activeRank: t.activeRank,
      rank: t.rank,
      wins: t.wins,
      losses: t.losses,
      draws: t.draws,
      seasons: []
    }
  }

  let gGames: { [key: number]: Game } = {};
  for (let g of schedule) {
    let pd = gPlayDates[g.pdid];

    if (! pd) {
      console.error("missing play date!");
    }

    let gDate = new Date(pd.dateStr + "T" + g.startTime);

    let gg: Game = {
      _id: g.gameID,
      date: gDate,
      playDate: pd,
      gameTime: new Date(g.startTime),
      homeTeam: gTeams[g.homeTeamID],
      awayTeam: gTeams[g.awayTeamID],
      homeScore: g.homeScore,
      awayScore: g.awayScore,
      forfeit: g.forfeit,
      field: gFieldsByCode[g.field],
      division: g.div,
      recorded: g.recorded,
      gameType: g.gameType,
      tournament: g.tournament,
      goals: [],
      cards: [],
      season: gSeasons[g.sid]
    }

    gGames[g.gameID] = gg;
    gSeasons[g.sid].games.push(gg);
  }

  // field lining
  let gFieldLining: FieldLining[] = [];
  let lid = 0;
  for (let fl of fieldLining) {
    lid += 1;
    let gfl: FieldLining = {
      _id: lid,
      date: new Date(fl.ldate + "T" + "08:00:00"),
      team1: gTeams[fl.tid1],
      team2: fl.tid2 ? gTeams[fl.tid2] : null,
      location: fl.location || "",
      season: gSeasons[fl.sid]
    }
    gFieldLining.push(gfl);
  }

  // Standings
  for (let s of standings) {
    let gs: Standings = {
      team: gTeams[s.teamid],
      rank: s.rank,
      seed: s.seed,
      wins: s.w,
      losses: s.l,
      draws: s.d,
      penaltyPoints: s.np,
      goalsFor: s.gf,
      goalsAgainst: s.ga,
      goalDifference: s.gd,
      tiebreaker: s.tb,
      points: s.points
    }
    

    let div = s.div as Division;
    if (s.tournament) {
      let group = s.group as string;
      let divStandings = gSeasons[s.sid].tournamentStandings[div];
      if (!(group in divStandings)) {
        divStandings[group] = []
      }
      divStandings[group].push(gs);
    }
    else {
      if (! gSeasons[s.sid].standings[div]) {
        console.log("bad data here");
      }
      gSeasons[s.sid].standings[div].push(gs);
    }
  }

  // Populate team seasons
  for (let s of Object.values(gSeasons)) {
    for (let st of Object.values(s.standings)) {
      let tids = st.map(s => s.team._id);
      for (let t of tids) {
        gTeams[t].seasons.push(s);
      }
    }
  }

  // Sort team seasons
  for (let t of Object.values(gTeams)) {
    t.seasons.sort((a, b) => a.end < b.end ? 1 : -1);
  }

  _grslData = {
    'seasons': gSeasons,
    'seasons2': gSeasons2,
    'teams': gTeams,
    'games': gGames,
    'fields': gFields,
    'fieldLining': gFieldLining,
    'players': gPlayers,
    'years': gYears,
    'playDates': gPlayDates
  }

  return _grslData;
}