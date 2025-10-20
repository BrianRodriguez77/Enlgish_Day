// ========== CONFIGURACIÓN Y DATOS ==========
console.log('🚀 script.js iniciado');

// Datos de país - AGREGADO SUIZA
const countryData = {
    IRL: { 
        name: 'IRELAND', 
        flag: 'https://flagcdn.com/w160/ie.png',
        colors: { dark: '#005b2e', main: '#007a3d', light: '#1db954' },
        url: '../Vistas/irlanda.html'
    },
    USA: { 
        name: 'UNITED STATES', 
        flag: 'https://flagcdn.com/w160/us.png',
        colors: { dark: '#062a4f', main: '#0b3d91', light: '#3b66c2' },
        url: '../Vistas/estadosunidos.html'
    },
    AUS: { 
        name: 'AUSTRALIA', 
        flag: 'https://flagcdn.com/w160/au.png',
        colors: { dark: '#012a4a', main: '#012a6b', light: '#06488b' },
        url: '../Vistas/australia.html'
    },
    GBR: { 
        name: 'UNITED KINGDOM', 
        flag: 'https://flagcdn.com/w160/gb.png',
        colors: { dark: '#5b0018', main: '#800020', light: '#9b2030' },
        url: '../Vistas/reinounido.html'
    },
    DEU: { 
        name: 'GERMANY', 
        flag: 'https://flagcdn.com/w160/de.png',
        colors: { dark: '#0f0f0f', main: '#1c1c1c', light: '#3a3a3a' },
        url: '../Vistas/alemania.html'
    },
    CAN: { 
        name: 'CANADA', 
        flag: 'https://flagcdn.com/w160/ca.png',
        colors: { dark: '#7a0000', main: '#b30000', light: '#d84b4b' },
        url: '../Vistas/canada.html'
    },
    ZAF: { 
        name: 'SOUTH AFRICA', 
        flag: 'https://flagcdn.com/w160/za.png',
        colors: { dark: '#003d1f', main: '#006633', light: '#1db954' },
        url: '../Vistas/sudafrica.html'
    },
    CHE: { 
        name: 'SWITZERLAND', 
        flag: 'https://flagcdn.com/w160/ch.png',
        colors: { dark: '#d70017', main: '#ff0000', light: '#ff4d4d' },
        url: '../Vistas/suiza.html'
    }
};

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM completamente cargado');
    initializePassportSystem();
});

function initializePassportSystem() {
    console.log('🔄 Inicializando sistema de pasaportes...');
    
    // Obtener elementos DOM - ACTUALIZADO para nueva estructura
    const elements = {
        profilePhotoDisplay: document.getElementById('profilePhotoDisplay'),
        photoFileInput: document.getElementById('photoFile'),
        passportPhotoPlaceholder: document.getElementById('passportPhotoPlaceholder'),
        customFileUploadBtn: document.getElementById('customUploadBtn'),
        fileNameDisplay: document.getElementById('fileNameDisplay'),
        passportForm: document.getElementById('passportForm'),
        passportContainerWrapper: document.getElementById('passportContainer'),
        passportElement: document.getElementById('passportElement'),
        passportCover: document.getElementById('passportCover'),
        flagDisplay: document.getElementById('flagDisplay'),
        downloadBtn: document.getElementById('downloadBtn'),
        visitCountryBtn: document.getElementById('visitCountryBtn'),
        formWrapper: document.getElementById('formWrapper'),
        downloadLoading: document.getElementById('downloadLoading')
    };

    // Verificar que todos los elementos existan
    let allElementsFound = true;
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`❌ Elemento no encontrado: ${key}`);
            allElementsFound = false;
        } else {
            console.log(`✅ ${key} encontrado`);
        }
    }

    if (!allElementsFound) {
        alert('Error: Algunos elementos no se encontraron. Revisa la consola para más detalles.');
        return;
    }

    console.log('✅ Todos los elementos encontrados correctamente');

    // Configurar event listeners
    setupEventListeners(elements);
}

function setupEventListeners(elements) {
    const {
        customFileUploadBtn,
        photoFileInput,
        profilePhotoDisplay,
        passportPhotoPlaceholder,
        fileNameDisplay,
        passportForm,
        passportContainerWrapper,
        formWrapper,
        downloadBtn,
        visitCountryBtn,
        downloadLoading
    } = elements;

    // Upload de archivo
    customFileUploadBtn.addEventListener('click', () => {
        console.log('📁 Click en upload de archivo');
        photoFileInput.click();
    });

    photoFileInput.addEventListener('change', function(event) {
        console.log('📸 Archivo seleccionado:', event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            fileNameDisplay.textContent = file.name;
            reader.onload = function(e) {
                profilePhotoDisplay.src = e.target.result;
                profilePhotoDisplay.style.display = 'block';
                passportPhotoPlaceholder.style.display = 'none';
                console.log('✅ Foto cargada correctamente');
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = 'Usando foto predeterminada';
            console.log('📷 Usando foto predeterminada');
        }
    });

    // Formulario de pasaporte
    passportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📝 Formulario enviado');
        generatePassport(elements);
    });

    // Botón de descarga
    downloadBtn.addEventListener('click', function() {
        console.log('📥 Botón de descarga clickeado');
        downloadPassportPDF(elements);
    });

    console.log('✅ Event listeners configurados');
}

// ========== GENERACIÓN DE PASAPORTE ==========
function generatePassport(elements) {
    const {
        passportForm,
        passportContainerWrapper,
        formWrapper
    } = elements;

    // Obtener datos del formulario
    const formData = {
        country: document.getElementById('country').value,
        docType: document.getElementById('docType').value,
        docNumber: document.getElementById('docNumber').value.trim(),
        fullName: document.getElementById('fullName').value.trim(),
        birthDate: document.getElementById('birthDate').value,
        office: document.getElementById('office').value
    };

    console.log('📊 Datos del formulario:', formData);

    // Validación básica
    if (!formData.country || !formData.fullName || !formData.docNumber || !formData.birthDate) {
        alert('❌ Por favor complete todos los campos requeridos');
        console.error('Validación fallida: campos incompletos');
        return;
    }

    if (!formData.fullName.trim()) {
        alert('❌ Por favor ingrese su nombre completo');
        console.error('Validación fallida: nombre vacío');
        return;
    }

    console.log('✅ Validación pasada');

    // Procesar nombre (VERSIÓN FLEXIBLE)
    let surnames, givenNames;

    if (formData.fullName.includes(',')) {
        // Si usa el formato con coma: "APELLIDOS, NOMBRES"
        const nameParts = formData.fullName.split(',');
        surnames = (nameParts[0] || '').trim().toUpperCase();
        givenNames = (nameParts[1] || '').trim().toUpperCase();
    } else {
        // Si no usa coma, asumimos que el último nombre es el apellido
        const nameParts = formData.fullName.trim().split(' ');
        if (nameParts.length >= 2) {
            // Última palabra como apellido, el resto como nombres
            surnames = nameParts.pop().toUpperCase();
            givenNames = nameParts.join(' ').toUpperCase();
        } else {
            // Si solo tiene una palabra, usarla como nombre
            surnames = 'USUARIO';
            givenNames = formData.fullName.trim().toUpperCase();
        }
    }

    console.log('👤 Nombre procesado:', { surnames, givenNames });

    // Generar datos del pasaporte
    const passportData = generatePassportData(formData.country, surnames, givenNames, formData);
    
    // Actualizar interfaz
    updatePassportInterface(passportData, elements);
    
    // Mostrar pasaporte
    formWrapper.classList.add('hidden');
    passportContainerWrapper.classList.remove('hidden');
    
    console.log('✅ Pasaporte generado exitosamente');
    
    // Scroll al pasaporte
    setTimeout(() => {
        passportContainerWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

function generatePassportData(countryCode, surnames, givenNames, formData) {
    const pdata = countryData[countryCode];
    
    // Número de pasaporte
    const passportNumber = 'DP' + Math.floor(10000000 + Math.random() * 90000000);
    
    // Fechas
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 10);
    
    const formatDate = (d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return {
        countryCode,
        passportNumber,
        surnames,
        givenNames,
        birthDate: formData.birthDate.split('-').reverse().join('-'),
        birthPlace: pdata ? pdata.name.toUpperCase() : 'INTERNACIONAL',
        issueDate: formatDate(issueDate),
        expiryDate: formatDate(expiryDate),
        office: formData.office,
        docNumber: `${formData.docType} ${formData.docNumber}`,
        countryData: pdata
    };
}

function updatePassportInterface(passportData, elements) {
    const { countryData, countryCode, passportNumber, surnames, givenNames, birthDate, birthPlace, issueDate, expiryDate, office, docNumber } = passportData;
    
    console.log('🎨 Actualizando interfaz del pasaporte:', passportData);

    // Aplicar colores del país
    if (countryData && countryData.colors) {
        applyPassportColors(countryData.colors);
    }

    // Actualizar textos
    document.getElementById('countryNameDisplay').textContent = countryData ? countryData.name : 'INTERNATIONAL';
    document.getElementById('countryCodeDisplay').textContent = countryCode || 'INT';
    document.getElementById('passportNumberDisplay').textContent = passportNumber;
    document.getElementById('surnameDisplay').textContent = surnames || '-';
    document.getElementById('givenNamesDisplay').textContent = givenNames || '-';
    document.getElementById('birthDateDisplay').textContent = birthDate;
    document.getElementById('birthPlaceDisplay').textContent = birthPlace;
    document.getElementById('issueDateDisplay').textContent = issueDate;
    document.getElementById('expiryDateDisplay').textContent = expiryDate;
    document.getElementById('officeDisplay').textContent = office;
    document.getElementById('docNumberDisplay').textContent = docNumber;
    document.getElementById('sexDisplay').textContent = 'X';

    // Bandera
    if (countryData && countryData.flag) {
        elements.flagDisplay.src = countryData.flag;
        console.log('🇺🇳 Bandera cargada:', countryData.flag);
    }

    // MRZ
    const mrz = generateMRZ(passportNumber, countryCode, birthDate, expiryDate, { surnames, givenNames });
    document.getElementById('mrzLine1').textContent = mrz[0];
    document.getElementById('mrzLine2').textContent = mrz[1];

    // Botón "Visitar País"
    if (countryData && countryData.url) {
        elements.visitCountryBtn.href = countryData.url;
        console.log('🔗 URL del país:', countryData.url);
    }
}

// ========== FUNCIONES AUXILIARES ==========
function applyPassportColors(colors) {
    document.documentElement.style.setProperty('--burgundy-dark', colors.dark);
    document.documentElement.style.setProperty('--burgundy-main', colors.main);
    document.documentElement.style.setProperty('--burgundy-light', colors.light);
    console.log('🎨 Colores aplicados:', colors);
}

function sanitizeFileName(text) {
    return text.replace(/[^a-z0-9_-]/gi, '_');
}

function generateMRZ(passportNumber, countryCode, birthDate, expiryDate, names) {
    const surnamesMRZ = names.surnames.replace(/[^A-Z0-9<]/g, '<').padEnd(30, '<').substring(0,30);
    const namesMRZ = names.givenNames.replace(/[^A-Z0-9<]/g, '<').padEnd(30, '<').substring(0,30);
    const mrz1 = `P<${countryCode}${surnamesMRZ}<<${namesMRZ}`.padEnd(44, '<');
    const birthMRZ = birthDate.replace(/-/g,'').replace(/\//g,'').substring(4, 8) + birthDate.substring(2, 4) + birthDate.substring(0, 2);
    const expiryMRZ = expiryDate.replace(/-/g,'').replace(/\//g,'').substring(4, 8) + expiryDate.substring(2, 4) + expiryDate.substring(0, 2);
    const sex = 'X';
    const mrz2 = `${passportNumber.padEnd(9,'<')}${countryCode}${birthMRZ}${sex}${expiryMRZ}<<<<<<<<<<<<<<<`.padEnd(44,'<');
    
    console.log('📄 MRZ generado:', { mrz1, mrz2 });
    return [mrz1.substring(0,44), mrz2.substring(0,44)];
}

// ========== DESCARGA PDF OPTIMIZADA ==========
async function downloadPassportPDF(elements) {
    console.log('🔄 Iniciando generación de PDF...');
    
    // Mostrar indicador de carga
    elements.downloadLoading.style.display = 'flex';
    
    try {
        // Esperar un momento para que se renderice el indicador
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Clonar el elemento y aplicar estilos específicos para PDF
        const clonedElement = elements.passportElement.cloneNode(true);
        
        // Aplicar clases de optimización para PDF
        clonedElement.classList.add('pdf-optimized');
        const cover = clonedElement.querySelector('.passport-cover');
        const interior = clonedElement.querySelector('.passport-interior');
        const coverContent = clonedElement.querySelector('.cover-content');
        const headerWithPhoto = clonedElement.querySelector('.interior-header-with-photo');
        const photoContainer = clonedElement.querySelector('.photo-container');
        const dataValues = clonedElement.querySelectorAll('.data-value');
        const headerValues = clonedElement.querySelectorAll('.header-value');
        const flagContainer = clonedElement.querySelector('.flag-container');
        const passportFlag = clonedElement.querySelector('.passport-flag');
        const mrzContainer = clonedElement.querySelector('.mrz-container');
        const mrzLines = clonedElement.querySelectorAll('.mrz-line');
        
        if (cover) cover.classList.add('pdf-optimized');
        if (interior) interior.classList.add('pdf-optimized');
        if (coverContent) coverContent.classList.add('pdf-optimized');
        if (headerWithPhoto) headerWithPhoto.classList.add('pdf-optimized');
        if (photoContainer) photoContainer.classList.add('pdf-optimized');
        if (flagContainer) flagContainer.classList.add('pdf-optimized');
        if (passportFlag) passportFlag.classList.add('pdf-optimized');
        if (mrzContainer) mrzContainer.classList.add('pdf-optimized');
        
        dataValues.forEach(el => el.classList.add('pdf-optimized'));
        headerValues.forEach(el => el.classList.add('pdf-optimized'));
        mrzLines.forEach(el => el.classList.add('pdf-optimized'));
        
        // Crear contenedor temporal para el clon
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '800px'; // Ancho fijo para PDF
        tempContainer.style.backgroundColor = 'white';
        tempContainer.appendChild(clonedElement);
        document.body.appendChild(tempContainer);
        
        // Configuración optimizada para PDF
        const canvas = await html2canvas(clonedElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: true,
            removeContainer: true,
            width: 800, // Ancho fijo
            height: clonedElement.scrollHeight * (800 / clonedElement.scrollWidth),
            onclone: function(clonedDoc, clonedElement) {
                // Asegurar que los estilos se mantengan
                clonedElement.style.width = '800px';
                clonedElement.style.margin = '0 auto';
            }
        });

        // Limpiar el contenedor temporal
        document.body.removeChild(tempContainer);
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 5; // Márgenes más pequeños
        const pdfWidth = pageWidth - (margin * 2);
        
        // Calcular altura manteniendo proporción
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // Centrar verticalmente si es necesario
        const yPosition = margin;
        
        pdf.addImage(imgData, 'PNG', margin, yPosition, pdfWidth, imgHeight);
        
        const surnameText = document.getElementById('surnameDisplay').textContent || 'Usuario';
        const countryText = document.getElementById('countryNameDisplay').textContent || 'Pais';
        const filename = `Pasaporte_${sanitizeFileName(surnameText)}_${sanitizeFileName(countryText)}.pdf`;

        pdf.save(filename);
        console.log('✅ PDF generado y descargado:', filename);
        
    } catch (err) {
        console.error('❌ Error al generar PDF:', err);
        alert('Ocurrió un error al generar el PDF. Intente nuevamente.');
    } finally {
        // Ocultar indicador de carga
        elements.downloadLoading.style.display = 'none';
    }
}

console.log('✅ script.js completamente cargado');