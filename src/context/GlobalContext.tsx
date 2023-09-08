import { createContext, useState, PropsWithChildren } from "react";

export type GlobalContextType = {
  token : string,
  setToken: (token: string) => void,
  expired : number,
  setExpired : (date : number) => void
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [token, setToken] = useState<GlobalContextType['token']>('');
  const [expired, setExpired] = useState<GlobalContextType['expired']>(0);

  return (
    <GlobalContext.Provider value={{ token, setToken, expired, setExpired }}>
      {children}
    </GlobalContext.Provider>
  );
};
