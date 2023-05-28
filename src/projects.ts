import { SongSparkHero } from './songspark/SongSparkHero'

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
  features?: string[]
  url?: string
  tags?: TechTag[]
  hero?: () => JSX.Element
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
    features: [
      'Algorithmically-generated melodies and underlying chord progressions',
      'Listen to generated the melodies and chords right in the browser',
      'Decide your own key, time signature, tempo, and instruments',
      'Export ideas to MIDI format for importing into your favorite DAW or other music software',
    ],
    url: 'https://songspark.bryanlindsey.dev',
    tags: [ReactTag, TypeScriptTag, WebAudioTag, TailwindTag],
    hero: SongSparkHero,
  },
  {
    id: 'pedals',
    name: 'Pedals',
    shortDescription: 'Create a virtual pedal board of effects for guitar',
    description:
      "This project was inspired by my son's interest in the guitar pedals of the GarageBand app on iPad (especially the Wah pedal you can control with your face!). " +
      'I wanted to be able to design my own pedals so I could do whatever I wanted with them. Looking around, I found the fantastic ' +
      'Tone.js library, which seemed like a perfect musical engine, and Konva which let me build an interactive 2D ' +
      'experience using HTML Canvas.',
    features: [
      'Drag and drop interface for placing guitar pedals and connecting them together',
      'Adjust pedal settings to dial in just the right sound',
      'Pass audio from a microphone (or other audio input) through your pedals',
      'Simple synth to test out pedal setups without audio input',
    ],
    url: 'https://pedals.bryanlindsey.dev',
    tags: [ReactTag, TypeScriptTag, WebAudioTag],
  },
  {
    id: 'tictactoeplus',
    name: 'Tic-Tac-Toe+',
    shortDescription: 'A unique twist on the classic game with an extra layer of strategy',
    description:
      'I decided to challenge myself to see how quickly I could make a React app. I just needed an idea.' +
      'Scrolling through Reddit one day, I saw a board game version of tic-tac-toe where players could place a larger ' +
      'on top of a smaller piece that had been played, adding an extra level of strategy to an otherwise fairly ' +
      'straightforward game. It felt simple enough to implement quickly while complex enough to be interesting.' +
      'I whipped up the original version on CodeSandbox in just a few hours, and eventually fleshed out the 3D version you see today.',
    features: [
      'Local two-player game of Tic-tac-toe... with a twist',
      'Place larger pieces on top of smaller ones to steal spaces',
      'Simple drag and drop controls and 3D visuals',
    ],
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
