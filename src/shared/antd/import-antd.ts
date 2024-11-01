import type { App } from 'vue';

import {
  Modal,
  Spin,
  Form,
  Row,
  Col,
  Tooltip,
  Switch,
  Menu,
  Dropdown,
  Popconfirm,
  Table,
  Divider,
  Select,
  InputNumber,
  Card,
  Upload,
  RangePicker,
  DatePicker,
  TreeSelect,
  Cascader,
  Tabs,
  Checkbox,
  Tag,
  Tree,
  Badge,
  Space,
  Empty,
  MenuItem,
  Collapse,
  Breadcrumb,
  RadioGroup,
  Radio,
  Pagination,
  Descriptions,
  Steps,
  Avatar,
  Image,
} from 'ant-design-vue';

import {
  UserOutlined,
  CloudOutlined,
  MailOutlined,
  LockOutlined,
  CloseCircleOutlined,
  SaveOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
  DeleteOutlined,
  RollbackOutlined,
  MoreOutlined,
  PlusOutlined,
  DownloadOutlined,
  ReloadOutlined,
  TeamOutlined,
  ShareAltOutlined,
  SafetyCertificateOutlined,
  RedoOutlined,
  EditOutlined,
  MedicineBoxOutlined,
  QuestionCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FileTwoTone,
  FolderTwoTone,
  PlusCircleTwoTone,
  HomeTwoTone,
  PieChartOutlined,
  HistoryOutlined,
  PhoneOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  SmileOutlined,
  DownOutlined,
  SearchOutlined,
  EllipsisOutlined,
  TableOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  LinkOutlined,
  FileOutlined,
  GithubFilled,
  CameraOutlined,
  LeftOutlined,
  RightOutlined,
  SmallDashOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  SettingFilled,
  CarryOutOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  ColumnHeightOutlined,
  FormOutlined,
  SettingOutlined,
  DragOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  MinusCircleOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FundViewOutlined,
  PicCenterOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
  FileImageOutlined,
} from '@ant-design/icons-vue';

// 注册 ant-design-vue component
function registerAntDesignComponent(app: App<Element>) {
  app.component('ARangePicker', RangePicker);
  app.component('ADatePicker', DatePicker);
  app.component('MenuItem', MenuItem);
  app.component('RadioGroup', RadioGroup);
  app.use(Spin);
  app.use(Modal);
  app.use(Form);
  app.use(Row);
  app.use(Col);
  app.use(Tooltip);
  app.use(Switch);
  app.use(Menu);
  app.use(Dropdown);
  app.use(Popconfirm);
  app.use(Table);
  app.use(Divider);
  app.use(Select);
  app.use(InputNumber);
  app.use(Card);
  app.use(Upload);
  app.use(TreeSelect);
  app.use(Cascader);
  app.use(Tabs);
  app.use(Checkbox);
  app.use(Tag);
  app.use(Tree);
  app.use(Badge);
  app.use(Space);
  app.use(Empty);
  app.use(Collapse);
  app.use(Breadcrumb);
  app.use(Radio);
  app.use(Pagination);
  app.use(Descriptions);
  app.use(Steps);
  app.use(Avatar);
  app.use(Image);
}

// 注册 ant-design-vue icon component
function registerAntDesignIcons(app: App<Element>) {
  app.component('CheckCircleTwoTone', CheckCircleTwoTone);
  app.component('CloseCircleTwoTone', CloseCircleTwoTone);
  app.component('QuestionCircleOutlined', QuestionCircleOutlined);
  app.component('UserOutlined', UserOutlined);
  app.component('CloudOutlined', CloudOutlined);
  app.component('MailOutlined', MailOutlined);
  app.component('LockOutlined', LockOutlined);
  app.component('CloseCircleOutlined', CloseCircleOutlined);
  app.component('SaveOutlined', SaveOutlined);
  app.component('ExclamationCircleTwoTone', ExclamationCircleTwoTone);
  app.component('DeleteOutlined', DeleteOutlined);
  app.component('RollbackOutlined', RollbackOutlined);
  app.component('MoreOutlined', MoreOutlined);
  app.component('PlusOutlined', PlusOutlined);
  app.component('DownloadOutlined', DownloadOutlined);
  app.component('ReloadOutlined', ReloadOutlined);
  app.component('TeamOutlined', TeamOutlined);
  app.component('ShareAltOutlined', ShareAltOutlined);
  app.component('SafetyCertificateOutlined', SafetyCertificateOutlined);
  app.component('RedoOutlined', RedoOutlined);
  app.component('EditOutlined', EditOutlined);
  app.component('MedicineBoxOutlined', MedicineBoxOutlined);
  app.component('FullscreenOutlined', FullscreenOutlined);
  app.component('FullscreenExitOutlined', FullscreenExitOutlined);
  app.component('FileTwoTone', FileTwoTone);
  app.component('FolderTwoTone', FolderTwoTone);
  app.component('PlusCircleTwoTone', PlusCircleTwoTone);
  app.component('HomeTwoTone', HomeTwoTone);
  app.component('HistoryOutlined', HistoryOutlined);
  app.component('PieChartOutlined', PieChartOutlined);
  app.component('PhoneOutlined', PhoneOutlined);
  app.component('CheckOutlined', CheckOutlined);
  app.component('CloseOutlined', CloseOutlined);
  app.component('CopyOutlined', CopyOutlined);
  app.component('SmileOutlined', SmileOutlined);
  app.component('DownOutlined', DownOutlined);
  app.component('SearchOutlined', SearchOutlined);
  app.component('EllipsisOutlined', EllipsisOutlined);
  app.component('TableOutlined', TableOutlined);
  app.component('CheckCircleOutlined', CheckCircleOutlined);
  app.component('InfoCircleOutlined', InfoCircleOutlined);
  app.component('ExclamationCircleOutlined', ExclamationCircleOutlined);
  app.component('MessageOutlined', MessageOutlined);
  app.component('LinkOutlined', LinkOutlined);
  app.component('FileOutlined', FileOutlined);
  app.component('GithubFilled', GithubFilled);
  app.component('CameraOutlined', CameraOutlined);
  app.component('LeftOutlined', LeftOutlined);
  app.component('RightOutlined', RightOutlined);
  app.component('SmallDashOutlined', SmallDashOutlined);
  app.component('AppstoreOutlined', AppstoreOutlined);
  app.component('MenuFoldOutlined', MenuFoldOutlined);
  app.component('MenuUnfoldOutlined', MenuUnfoldOutlined);
  app.component('DoubleRightOutlined', DoubleRightOutlined);
  app.component('DoubleLeftOutlined', DoubleLeftOutlined);
  app.component('SettingFilled', SettingFilled);
  app.component('CarryOutOutlined', CarryOutOutlined);
  app.component('FolderOpenOutlined', FolderOpenOutlined);
  app.component('FolderOutlined', FolderOutlined);
  app.component('ArrowUpOutlined', ArrowUpOutlined);
  app.component('ArrowDownOutlined', ArrowDownOutlined);
  app.component('AlignLeftOutlined', AlignLeftOutlined);
  app.component('AlignCenterOutlined', AlignCenterOutlined);
  app.component('AlignRightOutlined', AlignRightOutlined);
  app.component('ColumnHeightOutlined', ColumnHeightOutlined);
  app.component('SettingOutlined', SettingOutlined);
  app.component('DragOutlined', DragOutlined);
  app.component('FormOutlinedv', FormOutlined);
  app.component('LoadingOutlined', LoadingOutlined);
  app.component('ArrowLeftOutlined', ArrowLeftOutlined);
  app.component('SortAscendingOutlined', SortAscendingOutlined);
  app.component('SortDescendingOutlined', SortDescendingOutlined);
  app.component('FundViewOutlined', FundViewOutlined);
  app.component('PicCenterOutlined', PicCenterOutlined);
  app.component('ZoomInOutlined', ZoomInOutlined);
  app.component('ZoomOutOutlined', ZoomOutOutlined);
  app.component('MinusCircleOutlined', MinusCircleOutlined);
  app.component('UploadOutlined', UploadOutlined);
  app.component('CaretUpOutlined', CaretUpOutlined);
  app.component('CaretDownOutlined', CaretDownOutlined);
  app.component('CaretRightOutlined', CaretRightOutlined);
  app.component('ArrowRightOutlined', ArrowRightOutlined);
  app.component('FolderAddOutlined', FolderAddOutlined);
  app.component('FileImageOutlined', FileImageOutlined);
}

export function setupAntd(app: App<Element>) {
  // 注册 ant-design-vue icon component
  registerAntDesignIcons(app);
  // 注册 ant-design-vue component
  registerAntDesignComponent(app);
}
