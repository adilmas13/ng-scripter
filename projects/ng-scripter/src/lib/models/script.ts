export interface Script {
  id: string;
  src: string;
  async?: boolean;
  defer?: boolean;
  crossOrigin?: string;
}
