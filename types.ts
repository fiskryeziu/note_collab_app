export type TContext = {
  show: boolean;
  setShow: (value: boolean) => void;
  toggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
  toggle: () => void;
  pages: TNavlinks[];
  setPages: (value: TNavlinks[]) => void;
  loading: boolean;
  setLoading?: (value: boolean) => void;
};

export type TNavlinks = {
  id: number;
  slug: string;
  title: string;
};
