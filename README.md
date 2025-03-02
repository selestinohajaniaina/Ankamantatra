## Ankamantatra

lalao fametrahana fanontaniana, ary maminavina ny valiny amin'ny alalan'ny famantarana ao anaty fanontaniaina.
## Fitsipika: 
- Mifandimbidimby ny mametrahana fanontaniana.
- Miandry ny rehetra afapo vao omena ny valiny.
- afaka mamaetraka ankamantatra rehefa voavaly ny teo aloha.
## Run dev
```bash
    ng serve
```
## Generate icon & splash-screen
```bash
    npx cordova-res
    npx cordova-res android --skip-config --copy
```
## Build web
```bash
    ng build
```
## Build android
```bash
    ionic capacitor sync
    cd android
    ./gradlew assembleDebug
```