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
  getPageTitle: (id: string) => TPageProp;
  updateState: UpdateStateFn<TNavlinks>;
};

export type TPageProp = {
  cover: string;
  icon: string;
  title: string;
};

export type UpdateStateFn<T extends { id: string }> = (
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  id: T["id"], // Ensures the id matches the type of the `id` property in T
  prop: keyof T,
  value: T[keyof T],
) => void;

export type TNavlinks = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  cover: string;
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
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TControl = {
  title: string;
  cover: string;
  icon: string;
};

export type TTopBarProps = {
  controlData: TControl;
  setControlData: React.Dispatch<React.SetStateAction<TControl>>;
};
