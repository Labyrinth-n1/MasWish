import { useState, useEffect, useRef } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import './Card.scss';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import ProfilDefault from '../assets/images/center.png';
import LeftDefault from '../assets/images/left.png';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Cardd() {
    const [listColors, setListColors] = useState<string[]>(['#C23683', 'rgb(171, 10, 10)', '#C65010']);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
    const [color, setColor] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('#000');
    const [image, setImage] = useState<string | null>(null);
    const [profil, setProfil] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const [dest, setDest] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement>(null); // Référence pour capturer la carte
    const [visible, setVisible] = useState<boolean>(false);

    // Gestion de l'upload d'image
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Gestion de l'upload du profil
    const handleProfilUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfil(URL.createObjectURL(file));
        }
    };

    // Gestion de la modification de la description
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setDescription(value);
        }
    };

    // Gestion de la sélection d'une couleur
    const handleColorClick = (index: number) => {
        setSelectedColorIndex(index);
        setColor(listColors[index]);
    };

    // Ajouter une nouvelle couleur
    const addNewColor = () => {
        setListColors([...listColors, color]);
    };

    // Ajuster la couleur du texte en fonction du fond
    useEffect(() => {
        if (color === '#000000') {
            setTextColor('#fff');
        } else {
            setTextColor('#000');
        }
    }, [color]);

    // Télécharger la carte en PNG ou JPG
    const handleDownload = (format: string) => {
        if (!cardRef.current) return;

        const downloadFunction = format === 'png' ? toPng : toJpeg;

        downloadFunction(cardRef.current, { quality: 1 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `card.${format}`;
                link.click();
            })
            .catch((error) => {
                console.error('Error downloading image:', error);
            });
    };

    return (
        <>
            <div className="Color" style={{ display: 'flex', alignItems: 'center' }}>
                {listColors.map((clr, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: clr,
                            width: '50px',
                            height: '50px',
                            borderRadius: '10px',
                            border: index === selectedColorIndex ? '2px solid rgb(21, 175, 202)' : '2px solid transparent',
                            cursor: 'pointer',
                            marginLeft: '5px',
                        }}
                        onClick={() => handleColorClick(index)}
                    ></div>
                ))}
                <button style={{ marginLeft: '5px' }} className="addColor" onClick={addNewColor}>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
                </button>
            </div>

            <Button label="Aide" icon="pi pi-external-link" onClick={() => setVisible(true)} style={{position:'relative', bottom:'-100px'}} />
            <Dialog header="Guide d'utilisation" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <p className="m-0">
                    Bienvenue !! 
                    Laisse moi te guider. <br /> <br />
                    
                    <Badge value="1"></Badge> Tu cliques sur le bouton d'édition, <br /> 

                    <Badge value="2"></Badge> Tu téléverses une photo de profil,  <br />

                    <Badge value="3"></Badge> Tu téléverses une photo pour la partie gauche, <br />

                    <Badge value="4"></Badge> Tu choisis une couleur tout en haut pour la partie droite,  <br />

                    <Badge value="5"></Badge> Tu écris le message ( Description ), <br />

                    <Badge value="6"></Badge> Et tu écris le nom/prénom du Destinataire,  <br />

                    <Badge value="7" severity="success"></Badge> Ensuite tu télécharges !! 

                </p>
            </Dialog>

            <div className="All" ref={cardRef}>
                <div className="Profil" style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                        className="Profil-Circle"
                        style={{
                            backgroundImage: `url(${profil || ProfilDefault})`,
                            backgroundSize: 'cover',
                            borderRadius: '50%',
                            border: '2px solid #ddd',
                        }}
                    ></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', bottom: '-400px', zIndex: '3' }}>
                    <Card style={{ width: '75%', maxWidth: '700px', textAlign: 'center', overflow: 'hidden' }}>
                        <p style={{ padding: '.5rem', wordWrap: 'break-word', overflowWrap: 'break-word', fontFamily: 'Poppins' }}>
                            {description || "Ajoutez une description ici..."}
                        </p>
                    </Card>
                </div>

                <div
                    className="Carte"
                    style={{
                        backgroundImage: `url(${image || LeftDefault})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="Carte-leftPart"></div>
                    <div className="Carte-rightPart" style={{ backgroundColor: color }}></div>
                </div>
            </div>

            <div>
                <Button icon="pi pi-pen-to-square" iconPos="right" onClick={() => setIsEditing(!isEditing)} style={{marginTop:'20px'}}>
                    {isEditing ? 'Close Editor' : 'Edit'}
                </Button>

                <div className="Signature" style={{ color: textColor }}>
                    For <strong style={{ textDecoration: 'underline' }}>{dest || 'Someone'}</strong> by Me !!
                </div>

                {isEditing && (
                    <div className="edit">
                        <form style={{ marginTop: '20px' }}>
                            <div>
                                <label>Photo de profil</label> <br />
                                <input type="file" onChange={handleProfilUpload} accept="image/*" />
                            </div>

                            <div>
                                <label>Image pour la partie gauche</label> <br />
                                <input type="file" onChange={handleImageUpload} accept="image/*" />
                            </div>

                            <div>
                                <InputText
                                    type="text"
                                    value={dest}
                                    onChange={(e) => setDest(e.target.value)}
                                    className="Input"
                                    placeholder="Destinataire"
                                />
                            </div>

                            <div>
                                <InputText
                                    type="text"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="Input"
                                    placeholder="Description"
                                />
                                <p>{description.length}/200</p>
                                {description.length === 200 && <p style={{ color: 'red' }}>Vous avez atteint la limite !!</p>}
                            </div>
                        </form>
                    </div>
                )}

                <Button onClick={() => handleDownload('png')} style={{marginRight:'70px'}}>Download PNG</Button>
                <Button onClick={() => handleDownload('jpeg')}>Download JPG</Button>
            </div>
        </>
    );
}

export default Cardd;
