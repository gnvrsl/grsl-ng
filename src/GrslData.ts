import { 
  cards,
  fields,
  goals,
  schedule, 
  playDates,
  players, 
  seasons, 
  standings,
  teams,
 } from './assets/fulldata.json';

export interface Card {
  player: Player,
  game: Game,
  color: string,
  code: string,
  paid: boolean,
  comment: string| null,
  team: Team | null
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
  active: boolean
}

// from seaasons
export interface Season {
  _id: number,
  name: string,
  start: Date,
  end: Date,
  rosterLimit: number,
  hasTournament: boolean,
  comment: string | null,
  location: string,
  games: {
    [key in Division] : Game[]
  },
  standings: { [key in Division]: Standings[] },
  tournamentStandings: { [key in Division]: { [key: string]: Standings[] }},
  goals: Goal[],
  cards: Card[]
}

export interface Standings {
  team: Team,
  seed: number,
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

type Division = "a" | "b" | "c";
type GameType = "r" | "s" | "f" | "t" | "";

export interface LeagueData {
  'seasons': { [key: number]: Season },
  'teams': { [key: number]: Team },
  'games': { [key: number]: Game },
  'fields': { [key: number]: Field },
  'players': { [key: number]: Player}
}

let _grslData: LeagueData | null = null;

export function getData(): LeagueData {
  if (_grslData) {
    return _grslData;
  }

  let gSeasons: { [key: number]: Season } = {};
  for (let s of seasons) {
    let gs: Season = {
      _id: s.sid,
      name: s.name,
      start: new Date(s.start),
      end: new Date(s.end),
      rosterLimit: s.rosterLimit,
      hasTournament: s.Tournament,
      comment: s.comments,
      location: s.location,
      games: { a: [], b: [], c: []},
      standings: { a: [], b: [], c: []},
      tournamentStandings: { a: {}, b: {}, c: {}},
      goals: [],
      cards: [] 
    };
    gSeasons[gs._id] = gs;
  }

  let gPlayDates: { [key: number]: PlayDate } = {};
  for (let pd of playDates) {
    let pds = gSeasons[pd.sid];
    let gpd: PlayDate = {
      _id: pd.pdid,
      date: new Date(pd.gameDate),
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
      active: t.active
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
    gSeasons[g.sid].games[gg.division].push(gg);
  }

  for (let s of standings) {
    let gs: Standings = {
      team: gTeams[s.teamid],
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

  _grslData = {
    'seasons': gSeasons,
    'teams': gTeams,
    'games': gGames,
    'fields': gFields,
    'players': gPlayers
  }

  return _grslData;
}