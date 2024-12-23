import { useState, useEffect } from 'react';
import './slider.scss';
import Cardd from './Card';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

function Slider() {
    const [step, setStep] = useState(0); // Gère l'étape active

    // Fonction pour aller à l'étape suivante
    const handleNext = () => setStep((prev) => prev + 1);

    // Fonction pour revenir à l'étape précédente
    const handlePrev = () => setStep((prev) => prev - 1);

    // Composant pour la première étape
    const Slider1 = ({ onNext }: { onNext: () => void }) => {
        const [name, setName] = useState<string>('');

        const saveName = async () => {
            try {
                await axios.post('http://https:/mas-wish-backend.vercel.app/api/name', { name });
                onNext();
            } catch (error) {
                console.error("Erreur lors de l'enregistrement du nom", error);
            }
        };

        return (
            <div>
                <InputText
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="Card-Form-Input"
                    placeholder="Quel est ton nom ?"
                />
                <div className="Card-Form-Buttons">
                    {name.length > 0 && (
                        <Button
                            icon="pi pi-arrow-right"
                            onClick={saveName}
                            className="Card-Form-Buttons-BNext"
                            style={{ position: 'relative', right: '-155px' }}
                        />
                    )}
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
                    const response = await axios.get('http://https:/mas-wish-backend.vercel.app/api/name');
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
                        Hey, Joyeux Noël{' '}
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
        <div className="Card">
            {step === 0 && <Slider1 onNext={handleNext} />}
            {step === 1 && <Slider2 onPrev={handlePrev} onNext={handleNext} />}
            {step === 2 && <Cardd />}
        </div>
    );
}

export default Slider;
