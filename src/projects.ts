export type Project = {
  name: string
  shortDescription: string
  description: string
  url?: string
}

export const projects: Project[] = [
  {
    name: 'SongSpark',
    shortDescription: 'Making music, man',
    description: "Like I said, it's all about making music, man",
    url: 'https://songspark.bryanlindsey.dev',
  },
  {
    name: 'Pedals',
    shortDescription: 'Making more music, man',
    description: "Seriously, it's all about making more music, dude",
    url: 'https://pedals.bryanlindsey.dev',
  },
  {
    name: 'Tic-Tac-Toe+',
    shortDescription: 'Fight to the death',
    description: 'A more strategic version of a classic game',
    url: 'https://tictactoeplus.bryanlindsey.dev',
  },
  {
    name: 'Android projects',
    shortDescription: 'Projects... for Android',
    description: 'I make apps that run on Android devices',
  },
]
