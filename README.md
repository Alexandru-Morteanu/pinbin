## Informatii generale

- **Categorie**: Web
- **Judetul**: Vaslui
- **Surse**: [GitHub - Alexandru-Morteanu/pinbin](https://github.com/Alexandru-Morteanu/pinbin)
- **Homepage**: https://www.pinbin.site

## Descriere

PinBin este o **metoda de comunicare eficienta** între o **comunitate urbana** si **organele administrative** ale statului.

## Feature-uri ale platformei

- **🌍 Harta interactivă**: Explorează harta și vezi problemele depistate de comunitate.
- **📷 Detecție cameră live**: Ajută la vizualizarea și validarea problemelor din oraș.
- **🔗 Tehnologie blockchain**: Beneficiind de tehnologia blockchain, PinBin asigură transparență, securitate sporită și tranzacții irevocabile. De asemenea, grație descentralizării, nu există o entitate centrală care să poată controla sau manipula tranzacțiile.
- **🔑 Conectare ca administrator**: Aceasta se face cu ajutorul certificatelor digitale, care au rol în menținerea securității și încrederii utilizatorilor. După conectare, aceștia au posibilitatea de a rezolva problemele dar și datoria de a sesiza soluționarea lor, iar acea sesizare este una de încredere și ireversibilă datorită tehnologiei blockchain.

## Cum funcționează

Ideea a pornit de la faptul că noi ca și comunitate trebuie să cerem pentru a primi. Astfel cetățeanul poate sesiza problema cu ajutorul camerei de la telefon, după care trece printr-un proces de detecție și clasificare a problemei. Ulterior este pusă pe hartă locația, eticheta și poza cu problema dată. Apoi vine treaba acelui middleware (în mod normal ONG-urile) care validează acele probleme sesizate de cetățeni. Și în final, rolul administratorilor de a rezolva acestea (doar problemele validate de middleware) și a menționa modificările pe care le fac (măsurile pe care le iau). Acestea sunt ireversibile și publice pentru toată lumea.

## Tehnologii

### Frontend:

- Am folosit [Next.js](https://nextjs.org/), un framework JavaScript dezvoltat de [Vercel](https://vercel.com), care permite randarea pe server și generarea statică a site-urilor pentru aplicațiile [React](https://react.dev), realizând un design modular și performant.
- Pentru stilizarea interfeței utilizatorului, am utilizat [Tailwind](https://tailwindcss.com/).
- Am integrat hărți interactive în aplicație folosind [Leaflet](https://leafletjs.com/), o bibliotecă JavaScript open-source pentru hărți personalizabile.
- Pentru construcția interfeței utilizatorului, am folosit [shadcn/ui](https://ui.shadcn.com/), o bibliotecă de componente neformatate.

### Backend:

- Am utilizat pentru partea de server [ElysiaJS](https://elysiajs.com/), fiind o opțiune mult mai bună decât [Express](https://expressjs.com/).
- Ca și bază de date am folosit [Supabase](https://supabase.com/).
- Pentru clasificarea imaginilor am creat un dataset custom, pentru partea de [fine-tuning](https://www.techtarget.com/searchenterpriseai/definition/fine-tuning#:~:text=Fine%2Dtuning%20is%20the%20process,suit%20more%20specialized%20use%20cases.) și am antrenat modelul cu [Tensorflow](https://www.tensorflow.org/).
- Iar pentru a face posibilă partea de blockchain, am folosit [Hardhat](https://hardhat.org/) pentru deploy la un smart contract făcut în [Solidity](https://soliditylang.org/).
- Am ales ca backend-ul să ruleze într-un container [Docker](https://www.docker.com/) hostat pe [Render](https://render.com).

### Testing & Optimization:

- Am folosit [Cypress](https://www.cypress.io/) pentru testare end-to-end (E2E), simulând comportamentul utilizatorului și verificând răspunsul corespunzător al aplicației.
- Pentru testele unitare și de integrare, am utilizat [Jest](https://jestjs.io/), asigurând funcționarea corectă a fiecărei componente și funcții individuale.

Am dorit integrarea a cât mai multă tehnologie modernă într-o interfață cât mai simplă și prietenoasă, cu scopul de a face o schimbare în societate.
