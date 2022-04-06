import { WsProvider, ApiPromise } from "@polkadot/api";

const createPolkadotAPIInstance = async () => {
  const wsProvider = new WsProvider('wss://minichain.coming.chat/ws');
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;
  return api;
};

export default createPolkadotAPIInstance;