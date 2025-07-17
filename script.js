// Language translations
const translations = {
    vi: {
        title: "Xác thực giấy tờ",
        subtitle: "Chọn giấy tờ bạn muốn xác thực",
        documents: {
            id: "Chứng minh thư, Thẻ căn cước",
            passport: "Hộ chiếu",
            license: "Bằng lái xe",
            other: "Giấy tờ khác"
        },
        photoTitle: "CHỤP MẶT TRƯỚC",
        stepText: "Bước 1/4",
        buttons: {
            takePhoto: "CHỤP ẢNH",
            uploadPhoto: "TẢI ẢNH LÊN",
            start: "BẮT ĐẦU"
        },
        instruction: "Xin vui lòng đặt giấy tờ nằm vừa khung hình chữ nhật, chụp đủ ảnh sáng và rõ nét",
        helpLink: "Hướng dẫn",
        modal: {
            title: "Hướng dẫn chụp ảnh CMT, CCCD",
            step1: "Bước 1: Chụp mặt trước",
            step2: "Bước 2: Chụp mặt sau",
            instructions: [
                "Đưa giấy tờ vào gần camera sao cho 4 góc của giấy tờ trùng với vùng giới hạn",
                "Chụp rõ nét và đầy đủ thông tin trên giấy tờ"
            ],
            errors: [
                "Không chụp quá mờ",
                "Không chụp mất góc", 
                "Không chụp lóa sáng"
            ]
        }
    },
    en: {
        title: "Document Verification",
        subtitle: "Choose the document you want to verify",
        documents: {
            id: "ID Card, Citizen Card",
            passport: "Passport",
            license: "Driver's License",
            other: "Other Documents"
        },
        photoTitle: "CAPTURE FRONT SIDE",
        stepText: "Step 1/4",
        buttons: {
            takePhoto: "TAKE PHOTO",
            uploadPhoto: "UPLOAD PHOTO",
            start: "START"
        },
        instruction: "Please place the document within the rectangular frame, capture with sufficient light and clarity",
        helpLink: "Instructions",
        modal: {
            title: "ID Card Photo Capture Guide",
            step1: "Step 1: Capture front side",
            step2: "Step 2: Capture back side",
            instructions: [
                "Position the document close to camera so all 4 corners align with the boundary area",
                "Capture clearly with all information on the document visible"
            ],
            errors: [
                "Don't capture too blurry",
                "Don't capture with missing corners",
                "Don't capture with glare"
            ]
        }
    }
};

// Current language
let currentLanguage = 'vi';

// DOM elements
const languageSelect = document.getElementById('languageSelect');
const mainPage = document.getElementById('mainPage');
const photoPage = document.getElementById('photoPage');
const modal = document.getElementById('modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up language selector
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updateLanguage();
    });
    
    // Set up document option clicks
    const documentOptions = document.querySelectorAll('.document-option');
    documentOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            if (index === 0) { // ID Card option
                showModal();
            } else {
                // For other document types, you could implement different flows
                showModal();
            }
        });
    });
    
    // Set up modal close functionality
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Set up start button
    const startBtn = document.querySelector('.btn-start');
    if (startBtn) {
        startBtn.addEventListener('click', startCapture);
    }
    
    // Set up photo page buttons
    const takePhotoBtn = document.querySelector('.btn-primary');
    const uploadPhotoBtn = document.querySelector('.btn-secondary');
    
    if (takePhotoBtn) {
        takePhotoBtn.addEventListener('click', function() {
            // Simulate photo capture
            alert('Camera functionality would be implemented here');
        });
    }
    
    if (uploadPhotoBtn) {
        uploadPhotoBtn.addEventListener('click', function() {
            // Simulate file upload
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                if (e.target.files.length > 0) {
                    alert('File upload functionality would be implemented here');
                }
            };
            input.click();
        });
    }
    
    // Initialize with default language
    updateLanguage();
});

// Show modal
function showModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Start capture process
function startCapture() {
    closeModal();
    showPhotoPage();
}

// Show photo capture page
function showPhotoPage() {
    mainPage.classList.remove('active');
    photoPage.classList.add('active');
}

// Show main page
function showMainPage() {
    photoPage.classList.remove('active');
    mainPage.classList.add('active');
}

// Update language
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update main page
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    
    if (mainTitle) mainTitle.textContent = t.title;
    if (subtitle) subtitle.textContent = t.subtitle;
    
    // Update document options
    const documentTexts = document.querySelectorAll('.document-option span');
    const documentKeys = ['id', 'passport', 'license', 'other'];
    
    documentTexts.forEach((text, index) => {
        if (documentKeys[index] && t.documents[documentKeys[index]]) {
            text.textContent = t.documents[documentKeys[index]];
        }
    });
    
    // Update photo page
    const photoTitle = document.querySelector('.photo-title');
    const stepText = document.querySelector('.step-text');
    const instructionText = document.querySelector('.instruction-text');
    const helpLink = document.querySelector('.help-link a');
    
    if (photoTitle) photoTitle.textContent = t.photoTitle;
    if (stepText) stepText.textContent = t.stepText;
    if (instructionText) instructionText.textContent = t.instruction;
    if (helpLink) helpLink.textContent = t.helpLink;
    
    // Update buttons
    const takePhotoBtn = document.querySelector('.btn-primary');
    const uploadPhotoBtn = document.querySelector('.btn-secondary');
    const startBtn = document.querySelector('.btn-start');
    
    if (takePhotoBtn) {
        const icon = takePhotoBtn.querySelector('svg');
        takePhotoBtn.innerHTML = '';
        if (icon) takePhotoBtn.appendChild(icon);
        takePhotoBtn.appendChild(document.createTextNode(t.buttons.takePhoto));
    }
    
    if (uploadPhotoBtn) {
        const icon = uploadPhotoBtn.querySelector('svg');
        uploadPhotoBtn.innerHTML = '';
        if (icon) uploadPhotoBtn.appendChild(icon);
        uploadPhotoBtn.appendChild(document.createTextNode(t.buttons.uploadPhoto));
    }
    
    if (startBtn) startBtn.textContent = t.buttons.start;
    
    // Update modal
    const modalTitle = document.querySelector('.modal-header h2');
    if (modalTitle) modalTitle.textContent = t.modal.title;
    
    const instructionItems = document.querySelectorAll('.instruction-item p');
    if (instructionItems.length >= 2) {
        instructionItems[0].textContent = t.modal.step1;
        instructionItems[1].textContent = t.modal.step2;
    }
    
    const instructionList = document.querySelectorAll('.instruction-text li');
    instructionList.forEach((item, index) => {
        if (t.modal.instructions[index]) {
            item.textContent = t.modal.instructions[index];
        }
    });
    
    const errorTexts = document.querySelectorAll('.bad-example p');
    errorTexts.forEach((text, index) => {
        if (t.modal.errors[index]) {
            text.textContent = t.modal.errors[index];
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate document options on load
    const options = document.querySelectorAll('.document-option');
    options.forEach((option, index) => {
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            option.style.transition = 'all 0.6s ease';
            option.style.opacity = '1';
            option.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
    
    // Add hover sound effect simulation
    options.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Simulate progress bar animation
function updateProgress(step) {
    const progressFill = document.querySelector('.progress-fill');
    const stepText = document.querySelector('.step-text');
    
    if (progressFill && stepText) {
        const percentage = (step / 4) * 100;
        progressFill.style.width = percentage + '%';
        
        const t = translations[currentLanguage];
        stepText.textContent = currentLanguage === 'vi' ? `Bước ${step}/4` : `Step ${step}/4`;
    }
}

// Export functions for potential external use
window.eKYC = {
    showModal,
    closeModal,
    startCapture,
    showPhotoPage,
    showMainPage,
    updateLanguage,
    updateProgress
};
