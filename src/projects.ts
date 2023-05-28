interface TechTag {
  name: string
}

const ReactTag: TechTag = {
  name: 'React',
}

const ThreeJsTag: TechTag = {
  name: 'Three.js',
}

const TypeScriptTag: TechTag = {
  name: 'TypeScript',
}

const TailwindTag: TechTag = {
  name: 'Tailwind CSS',
}

const AndroidTag: TechTag = {
  name: 'Android',
}

const WebAudioTag: TechTag = {
  name: 'Web Audio',
}

export type Project = {
  id: string
  name: string
  shortDescription: string
  description: string
  url?: string
  tags?: TechTag[]
}

export const projects: Project[] = [
  {
    id: 'songspark',
    name: 'SongSpark',
    shortDescription: 'Inspire your inner songwriter with generated musical ideas',
    description:
      'The web version of my pet project for the past decade or so. The idea was inspired by a music theory class I took in college. ' +
      'The underlying mathematical nature of what makes music appealing felt like fertile ground for exploration through code. ' +
      'The original app was broader in scope, including generating a full verse and chorus. However, I pared things down for the latest ' +
      'iteration to focus on generating small melodic ideas to spur creativity.',
    url: 'https://songspark.bryanlindsey.dev',
    tags: [ReactTag, TypeScriptTag, WebAudioTag, TailwindTag],
  },
  {
    id: 'pedals',
    name: 'Pedals',
    shortDescription: 'Making more music, man',
    description: "Seriously, it's all about making more music, dude",
    url: 'https://pedals.bryanlindsey.dev',
    tags: [ReactTag, TypeScriptTag, WebAudioTag],
  },
  {
    id: 'tictactoeplus',
    name: 'Tic-Tac-Toe+',
    shortDescription: 'Fight to the death',
    description: 'A more strategic version of a classic game',
    url: 'https://tictactoeplus.bryanlindsey.dev',
    tags: [ReactTag, ThreeJsTag, TypeScriptTag],
  },
  {
    id: 'android',
    name: 'Android projects',
    shortDescription: 'Projects... for Android',
    description: 'I make apps that run on Android devices',
    tags: [AndroidTag],
  },
]

export const projectMap: Map<string, Project> = new Map()
projects.forEach((project) => (projectMap[project.id] = project))
