export type TContext = {
  show: boolean;
  setShow: (value: boolean) => void;
  toggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
  toggle: () => void;
  pages: TNavlinks[];
  setPages: React.Dispatch<React.SetStateAction<TNavlinks[]>>;
  loading: boolean;
  setLoading?: (value: boolean) => void;
};

export type TNavlinks = {
  id: string;
  slug: string;
  title: string;
};

export type TEmoji<T> = {
  alises: T[];
  id: T;
  keywords: T[];
  name: T;
  native: T;
  shortcodes: T;
  skin: number;
  unified: T;
};

export type EmojiCompProps = {
  toggle?: () => void;
  show: boolean;
  value?: string;
  add: (value: TEmoji<string>) => void;
};

export type TControl = {
  title: string;
  img: string;
  comment: string;
};
