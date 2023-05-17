import React from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName
} from 'wagmi';

export const Profile: React.FC = () => {
  const { address = '0x', connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ name: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const handleDisconect = (): void => {
    disconnect();
  };

  if (isConnected) {
    return (
      <div>
        <img
          src={ensAvatar == null || ensAvatar == null ? '' : ensAvatar}
          alt="ENS Avatar"
        />
        <div>
          {ensName !== null && ensName !== undefined
            ? `${ensName} (${address})`
            : address}
        </div>
        <div>Connected to {connector === undefined ? '' : connector.name}</div>
        <button onClick={handleDisconect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            connect({ connector });
          }}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error != null && <div>{error.message}</div>}
    </div>
  );
};
