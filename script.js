


function handleScroll() {
    const header = document.getElementById('main-header');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (header) {
        header.classList.toggle('header-fixed', scrollPosition > 100);
    }
}


function redirectTo(url) {
    window.location.href = url;
}


function setupInfiniteScroll() {
    const commentsContainer = document.querySelector('.user-comments');
    if (!commentsContainer) return;

    const firstComment = commentsContainer.firstElementChild.cloneNode(true);
    const lastComment = commentsContainer.lastElementChild.cloneNode(true);

    commentsContainer.insertBefore(lastComment, commentsContainer.firstChild);
    commentsContainer.appendChild(firstComment);

    
    commentsContainer.scrollLeft += firstComment.offsetWidth;
}


function initializeEventListeners() {
    
    window.addEventListener('scroll', handleScroll);

    
    const signinBtn = document.getElementById('signin-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (signinBtn) {
        signinBtn.addEventListener('click', () => redirectTo('log_user.html'));
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => redirectTo('log_user.html'));
    }

    
    const commentsContainer = document.querySelector('.user-comments');
    if (commentsContainer) {
        const commentWidth = commentsContainer.firstElementChild.offsetWidth;
        const leftScrollButton = document.querySelector('.scroll-button.left');
        const rightScrollButton = document.querySelector('.scroll-button.right');

        if (leftScrollButton) {
            leftScrollButton.addEventListener('click', () => {
                commentsContainer.scrollLeft -= commentWidth;
                if (commentsContainer.scrollLeft === 0) {
                    
                    commentsContainer.scrollLeft = commentsContainer.scrollWidth - 2 * commentWidth;
                }
            });
        }

        if (rightScrollButton) {
            rightScrollButton.addEventListener('click', () => {
                commentsContainer.scrollLeft += commentWidth;
                if (commentsContainer.scrollLeft === commentsContainer.scrollWidth - commentWidth) {
                    
                    commentsContainer.scrollLeft = commentWidth;
                }
            });
        }

        
        setupInfiniteScroll();
    }
}


document.addEventListener('DOMContentLoaded', initializeEventListeners);
