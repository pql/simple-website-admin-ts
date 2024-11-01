export const themeList = {
  1: {
    id: 1,
    name: '明亮',
    color: ['rgb(73, 146, 255)', 'rgb(124, 255, 178)', 'rgb(253, 221, 96)', 'rgb(255, 110, 118)', 'rgb(88, 217, 249)', 'rgb(5, 192, 145)'],
    data: []
  },
  2: {
    id: 2,
    name: '暗淡',
    color: ['rgb(84, 112, 198)', 'rgb(145, 204, 117)', 'rgb(250, 200, 88)', 'rgb(238, 102, 102)', 'rgb(115, 192, 222)', 'rgb(59, 162, 114)'],
    data: []
  },
  3: {
    id: 3,
    name: '马卡龙',
    color: ['rgb(46, 199, 201)', 'rgb(182, 162, 222)', 'rgb(90, 177, 239)', 'rgb(255, 185, 128)', 'rgb(216, 122, 128)', 'rgb(141, 152, 179)'],
    data: []
  },
  4: {
    id: 4,
    name: '深色',
    color: ['rgb(193, 46, 52)', 'rgb(230, 182, 0)', 'rgb(0, 152, 217)', 'rgb(43, 130, 29)', 'rgb(0, 94, 170)', 'rgb(51, 156, 168)'],
    data: []
  },
  5: {
    id: 5,
    name: '罗马红',
    color: ['rgb(224, 31, 84)', 'rgb(94, 78, 165)', 'rgb(245, 232, 200)', 'rgb(184, 210, 199)', 'rgb(198, 179, 142)', 'rgb(164, 216, 194)'],
    data: []
  }
}

//基本配置
export const config = {
  width: 1920,
  height: 1080,
  query: "function(){\n    return window.$glob.params || {}\n}",
  header: "function(){\n    return window.$glob.params || {}\n}",
  screen: 'x',
  group: [],
  glob: [],
  theme: themeList,
  themeId: '',
  filters: {},
  funcs: {},
  style: '',
  before: '',
  overflow: false,
  styles: {
    show: false,
    contrast: 100,
    saturate: 100,
    brightness: 100,
    opacity: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    blur: 0
  },
  fonts: [],
  mark: {
    show: false,
    text: '',
    fontSize: 20,
    color: 'rgba(100,100,100,0.2)',
    degree: -20
  },
  version: '',
  scale: 1,
  backgroundImage: `/img/bg/bg.png`,
  url: '',
  toolShow: true,
  folderDeep: false,
  gradeShow: false,
  gradeLen: 30,
};