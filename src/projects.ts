export type Project = {
  id: string
  name: string
  shortDescription: string
  description: string
  url?: string
}

export const projects: Project[] = [
  {
    id: 'songspark',
    name: 'SongSpark',
    shortDescription: 'Making music, man',
    description: "Like I said, it's all about making music, man",
    url: 'https://songspark.bryanlindsey.dev',
  },
  {
    id: 'pedals',
    name: 'Pedals',
    shortDescription: 'Making more music, man',
    description: "Seriously, it's all about making more music, dude",
    url: 'https://pedals.bryanlindsey.dev',
  },
  {
    id: 'tictactoeplus',
    name: 'Tic-Tac-Toe+',
    shortDescription: 'Fight to the death',
    description: 'A more strategic version of a classic game',
    url: 'https://tictactoeplus.bryanlindsey.dev',
  },
  {
    id: 'android',
    name: 'Android projects',
    shortDescription: 'Projects... for Android',
    description: 'I make apps that run on Android devices',
  },
]

export const projectMap: Map<string, Project> = new Map()
projects.forEach((project) => (projectMap[project.id] = project))
