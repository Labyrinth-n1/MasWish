import { useState, useEffect } from 'react';
import './slider.scss';
import Cardd from './Card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeicons/primeicons.css';
import axios from 'axios';
import c1 from "../assets/images/vec1.png"

function Slider() {
    const [step, setStep] = useState(0); 
    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    

    // Composant pour la première étape
    const Slider1 = ({ onNext }: { onNext: () => void }) => {
        const [name, setName] = useState<string>('');

        const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value.length <= 15) {
                setName(value);
            }
        };

        const saveName = async () => {

            setIsLoading(true);  // Afficher le spinner
            try {
                await axios.post('https://mas-wish-backend.vercel.app/api/name', { name });
                onNext();
            } catch (error) {
                console.error("Erreur lors de l'enregistrement du nom", error);
            }

            setIsLoading(false); 
        };

        return (
            <div>
                
                <div className="C1">
                     <img  className="C1-img" src={c1} alt="" />
                </div>

                <div className="Welcome">
                      <h1 className='Welcome-h1'>Merry Christmas</h1>
                      <p>Bienvenue sur <em style={{color:'rgb(171, 10, 10)', fontWeight:'bolder'}}> MasWish</em> !!  Le site de personnalisation <br /> de carte de voeux  pour vos proches. Enjoy it  ❤ ❤ </p>
                </div>

                <InputText
                    type="text"
                    value={name}
                    onChange={handleDescriptionChange}
                    className="Card-Form-Input"
                    placeholder="Quel est ton nom ?"
                    style={{position:'relative', top:'-30px'}}
                    
                />

                <p className='e' style={{ position: 'relative'}}>{name.length}/15</p>
                <div className="error">
                    {name.length === 15 && <p style={{ color: 'rgb(171, 10, 10)', position:'relative', top:'-70px' }} >Essayez d'écrire un nom à 15 lettres !!</p>}
                </div>
                <div className="Card-Form-Buttons">
                    {name.length > 0  && !isLoading && (
                        <Button
                            icon="pi pi-arrow-right"
                            onClick={saveName}
                            className="Card-Form-Buttons-BNext"
                            style={{ position: 'relative', right: '-155px', marginBottom:'30px'}}

                        />
                    )}

                    {isLoading &&<ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
                </div>
            </div>
        );
    };

    // Composant pour la deuxième étape
    const Slider2 = ({
        onPrev,
        onNext,
    }: {
        onPrev: () => void;
        onNext: () => void;
    }) => {
        const [name, setName] = useState<string>('');

        useEffect(() => {
            const fetchName = async () => {
                try {
                    const response = await axios.get('https://mas-wish-backend.vercel.app/api/name');
                    setName(response.data.name);
                } catch (error) {
                    console.error("Erreur lors de la récupération du nom", error);
                }
            };
            fetchName();
        }, []);

        return (
            <div>
                <form className="Card-Form">
                    <p>
                        <strong>Hey, Joyeux Noël{' '}</strong> <br /> <br />
                        <span style={{ color: 'rgb(171, 10, 10)', fontWeight: 'bolder' }}>
                            {name}
                        </span>
                    </p>
                    <div className="Card-Form-Buttons">
                        {step > 0 && (
                            <Button
                                icon="pi pi-arrow-left"
                                onClick={onPrev}
                                className="Card-Form-Buttons-BBack"
                            />
                        )}
                        <Button
                            icon="pi pi-arrow-right"
                            onClick={onNext}
                            className="Card-Form-Buttons-BNext"
                        />
                    </div>
                </form>
            </div>
        );
    };

    // Rendu du composant principal
    return (

        <div>
    
        <div className="Card">
            {step === 0 && <Slider1 onNext={handleNext} />}
            {step === 1 && <Slider2 onPrev={handlePrev} onNext={handleNext} />}
            {step === 2 && <Cardd />}
        </div>

        </div>
    );
}

export default Slider;
