
# BB Front

Proyecto Frontend Alfa para BB 
## Descripción

El objetivo del proyecto es probar funcionalidad de los los componentes core de BB con la ayuda de una interfaz de usuario simple y dezentralizada.

## Requerimientos:
- Yarn
- Metamask instalado en su navegador
- Fondos del Security Token BB para probar funcionalidades.
  
## Instalación

Primero, clona este repositorio en tu máquina
Instala las dependencias del proyecto:

```bash
yarn
```

## Estructura de Archivos
```bash
📦bb-front
┣ 📜.eslintrc.json
┣ 📜.prettierrc
┣ 📜README.md
┣ 📜package-lock.json
┣ 📜package.json
┣ 📂public
 ┃┣ 📜favicon.ico
 ┃┣ 📜index.html
 ┃┣ 📜logo192.png
 ┃┣ 📜logo512.png
 ┃┣ 📜manifest.json
 ┃┗ 📜robots.txt

┣ 📂src
 ┃┣ 📜App.test.tsx
 ┃┣ 📜App.tsx
 ┃┣ 📂Interfaces
 ┃ ┃┣ 📂ERC1155
 ┃ ┃ ┃┗ 📜IFNFTMetadataStruct.ts
 ┃ ┃
 ┃
 ┃┣ 📂blockchain
 ┃ ┃┣ 📂artifacts       #Colocar Aqui los ABIs
 ┃ ┃ ┃┣ 📜ERC1155.json
 ┃ ┃ ┃┗ 📜MyToken.json
 ┃ ┃
 ┃
 ┃┣ 📂components
 ┃ ┃┣ 📜LabelAndText.tsx
 ┃ ┃┣ 📂Loading
 ┃ ┃ ┃┗ 📜CircularProgressBarBox.tsx
 ┃ ┃
 ┃ ┃┣ 📂Title
 ┃ ┃ ┃┗ 📜Title.tsx
 ┃ ┃
 ┃ ┃┣ 📂button
 ┃ ┃ ┃┗ 📜ButtonWalletCustom.tsx
 ┃ ┃
 ┃ ┃┣ 📂card
 ┃ ┃ ┃┗ 📜TextFieldItem.tsx
 ┃ ┃
 ┃ ┃┣ 📂disclaimer
 ┃ ┃ ┃┗ 📜disclaimerCustom.tsx
 ┃ ┃
 ┃
 ┃┣ 📂hooks
 ┃ ┃┣ 📂ERC1155
 ┃ ┃ ┃┗ 📜useGetTokensOwnedEthers.ts
 ┃ ┃
 ┃ ┃┣ 📂ERC20
 ┃ ┃ ┃┣ 📜useAllowanceEthers.ts
 ┃ ┃ ┃┣ 📜useApproveEthers.ts
 ┃ ┃ ┃┣ 📜useBalanceEthers.ts
 ┃ ┃ ┃┣ 📜useBurnEthers.ts
 ┃ ┃ ┃┣ 📜useBurnFromEthers.ts
 ┃ ┃ ┃┣ 📜useDecreaseAllowanceEthers.ts
 ┃ ┃ ┃┣ 📜useDisableMaxSupplyEthers.ts
 ┃ ┃ ┃┣ 📜useEnableMaxSupplyEthers.ts
 ┃ ┃ ┃┣ 📜useIncreaseAllowanceEthers.ts
 ┃ ┃ ┃┣ 📜useInfoContractEthers.ts
 ┃ ┃ ┃┣ 📜useMintEthers.ts
 ┃ ┃ ┃┣ 📜useTransferEthers.ts
 ┃ ┃ ┃┗ 📜useTransferFromEthers.ts
 ┃ ┃
 ┃ ┃┣ 📜redux.ts
 ┃ ┃┣ 📜useContractERC1155.ts
 ┃ ┃┣ 📜useContractReadERC1155Mumbai.ts
 ┃ ┃┣ 📜useContractReadERC20.ts
 ┃ ┃┣ 📜useContractReadERC20Mumbai.ts
 ┃ ┃┗ 📜useContractWriteCustom.ts
 ┃
 ┃┣ 📜index.tsx
 ┃┣ 📂layouts
 ┃ ┃┣ 📜DashboardContent.tsx
 ┃ ┃┣ 📜EnrollmentLayout.tsx
 ┃ ┃┗ 📜enrollment.css
 ┃
 ┃┣ 📜react-app-env.d.ts
 ┃┣ 📜reportWebVitals.ts
 ┃┣ 📂routes
 ┃ ┃┣ 📜PrivateRoute.tsx
 ┃ ┃┣ 📜PublicRoute.tsx
 ┃ ┃┗ 📜RouterComponent.tsx
 ┃
 ┃┣ 📂service
 ┃ ┃┣ 📜axiosService.ts
 ┃ ┃┗ 📜web3Service.ts        # Configuracion de nodos
 ┃
 ┃┣ 📜setupTests.ts
 ┃┣ 📂store
 ┃ ┃┣ 📂Dashboard
 ┃ ┃ ┃┗ 📜index.ts
 ┃ ┃
 ┃ ┃┣ 📂TokenBNB
 ┃ ┃ ┃┗ 📜index.ts
 ┃ ┃
 ┃ ┃┣ 📂auth
 ┃ ┃ ┃┗ 📜index.ts
 ┃ ┃
 ┃ ┃┗ 📜index.ts
 ┃
 ┃┣ 📂utils
 ┃ ┃┗ 📜ethereum.ts
 ┃
 ┃┣ 📂views
 ┃ ┃┣ 📂Dashboard
 ┃ ┃ ┃┣ 📜AllowanceComponent.tsx
 ┃ ┃ ┃┣ 📜ApproveComponent.tsx
 ┃ ┃ ┃┣ 📜BalanceOf.tsx
 ┃ ┃ ┃┣ 📜BurnComponent.tsx
 ┃ ┃ ┃┣ 📜BurnFromComponent.tsx
 ┃ ┃ ┃┣ 📜Chart.tsx
 ┃ ┃ ┃┣ 📜Dashboard.tsx
 ┃ ┃ ┃┣ 📜DecreaseAllowanceComponent.tsx
 ┃ ┃ ┃┣ 📜Deposits.tsx
 ┃ ┃ ┃┣ 📜ERC20Component.tsx
 ┃ ┃ ┃┣ 📜IncreaseAllowanceComponent.tsx
 ┃ ┃ ┃┣ 📜MaxSupplyDisabledComponent.tsx
 ┃ ┃ ┃┣ 📜MaxSupplyEnabledComponent.tsx
 ┃ ┃ ┃┣ 📜MintComponent.tsx
 ┃ ┃ ┃┣ 📜Orders.tsx
 ┃ ┃ ┃┣ 📜Title.tsx
 ┃ ┃ ┃┣ 📜TransferComponent.tsx
 ┃ ┃ ┃┣ 📜TransferFromComponent.tsx
 ┃ ┃ ┃┗ 📜listItems.tsx
 ┃ ┃
 ┃ ┃┣ 📂ERC1155
 ┃ ┃ ┃┣ 📜AllowanceCustomERC20Component.tsx
 ┃ ┃ ┃┣ 📜ApproveCustomERC20Component.tsx
 ┃ ┃ ┃┣ 📜BalanceCustomERC20Component.tsx
 ┃ ┃ ┃┣ 📜BalanceOfComponent.tsx
 ┃ ┃ ┃┣ 📜ERC1155Component.tsx
 ┃ ┃ ┃┣ 📜ERC20TokenComponent.tsx
 ┃ ┃ ┃┣ 📜FNFTMetadataComponent.tsx
 ┃ ┃ ┃┣ 📜FNFTsOwnedComponent.tsx
 ┃ ┃ ┃┣ 📜FNFTsOwnedUnBlockedComponent.tsx
 ┃ ┃ ┃┣ 📜IsApprovedForAllComponent.tsx
 ┃ ┃ ┃┣ 📜MintComponent.tsx
 ┃ ┃ ┃┣ 📜OwnedTokensComponent.tsx
 ┃ ┃ ┃┣ 📜RevisedReturnPeriodComponent.tsx
 ┃ ┃ ┃┣ 📜SetSecurityTokenComponent.tsx
 ┃ ┃ ┃┣ 📜TokenIDCounterComponent.tsx
 ┃ ┃ ┃┣ 📜Transfer1155Component.tsx
 ┃ ┃ ┃┣ 📜UriComponent.tsx
 ┃ ┃ ┃┗ 📜WithDrawComponent.tsx
 ┃ ┃
 ┃ ┃┣ 📂ERC20
 ┃ ┃ ┃┣ 📜AllowanceComponent.tsx
 ┃ ┃ ┃┣ 📜ApproveComponent.tsx
 ┃ ┃ ┃┣ 📜BalanceOf.tsx
 ┃ ┃ ┃┣ 📜BalanceOfComponent.tsx
 ┃ ┃ ┃┣ 📜BurnComponent.tsx
 ┃ ┃ ┃┣ 📜BurnFromComponent.tsx
 ┃ ┃ ┃┣ 📜DecreaseAllowanceComponent.tsx
 ┃ ┃ ┃┣ 📜Deposits.tsx
 ┃ ┃ ┃┣ 📜ERC20EthersComponent.tsx
 ┃ ┃ ┃┣ 📜IncreaseAllowanceComponent.tsx
 ┃ ┃ ┃┣ 📜MaxSupplyDisabledComponent.tsx
 ┃ ┃ ┃┣ 📜MaxSupplyEnabledComponent.tsx
 ┃ ┃ ┃┣ 📜MintComponent.tsx
 ┃ ┃ ┃┣ 📜TransferComponent.tsx
 ┃ ┃ ┃┗ 📜TransferFromComponent.tsx
 ┃ ┃
 ┃ ┃┣ 📜HomeView.tsx
 ┃ ┃┗ 📜Profile.tsx
 ┃

┣ 📜tsconfig.json
┗ 📜yarn.lock

```

## Uso

Para iniciar el servidor de desarrollo:

```bash
yarn start
```

Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

La página se recargará si haces modificaciones. También verás cualquier error lint en la consola.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
yarn test
```

## Despliegue

Para crear una versión de producción de la aplicación:

```bash
yarn build
```

Esto crea una versión de producción de la aplicación en el directorio `build`. Puedes servir esto con un servidor estático o desplegarlo en un servicio de hosting.


## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

