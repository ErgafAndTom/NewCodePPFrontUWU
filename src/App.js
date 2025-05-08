import LifeHacksBoard from "./PrintPeaksFAinal/lifeHacksBoard/LifeHacksBoard";
import './bootstrap.css';
import './bootstrap.css.map';
import './App.css';
import './Colors.css';
import './StylesOld.css';
import './index.css';
import './global.css';
import {Provider} from "react-redux";
import store from "./stores/store";
import {BrowserRouter as Router} from 'react-router-dom'
import React, {useEffect} from "react";
import AllWindow from "./components/AllWindow";


function App() {
    useEffect(() => {
        document.fonts.ready.then(() => {
            if (document.fonts.check('1.3vh "Montserrat"')) {
                console.log('✅ Шрифт Montserrat завантажено та готовий до використання!');
            } else {
                console.warn('❌ Шрифт Montserrat не завантажено або недоступний.');
                // Спробуємо примусово завантажити шрифти
                // Використовуємо відносні шляхи до шрифтів
                const regularFont = new FontFace('Montserrat', 'url(./fonts/Montserrat-Regular.ttf)', { weight: '400' });
                const boldFont = new FontFace('Montserrat', 'url(./fonts/Montserrat-Bold.ttf)', { weight: '700' });
                
                Promise.all([regularFont.load(), boldFont.load()])
                    .then(loadedFonts => {
                        loadedFonts.forEach(font => document.fonts.add(font));
                        console.log('✅ Шрифти Montserrat завантажено примусово!');
                    })
                    .catch(err => console.error('❌ Помилка при завантаженні шрифтів:', err));
            }
        });
    }, []);
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <AllWindow/>
                </Router>
            </Provider>
        </div>
    )
}

export default App;
