const burgerButton = getElement('button', ['menu-button']);
const wrapperHeader = getElement('div', ['header']);

/* const setFavicon = (favImage) => {
    const headTitle = document.querySelector('head');
    const favicon = document.createElement('link');
    favicon.setAttribute('rel', 'shortcut icon');
    favicon.setAttribute('href', favImage);
    headTitle.append(favicon);
}; */

function getElement(tagName, classNames, attributes) {
    const element = document.createElement(tagName);

    if (classNames) {
        element.classList.add(...classNames )
    }

    if (attributes) {
        for (const attribute in attributes) {
            element[attribute] = attributes[attribute];
        }
    }

    return element;
};

const createHeader = ({ title, header: { logo, menu, social, burger } }) => {
    const header = getElement('header');
    const container = getElement('div', ['container']); 

    if (logo) {
        const logotype = getElement('img', ['logo'], {
            src: logo,
            alt: 'Логотип' + title,
        });
        wrapperHeader.append(logotype); 
    }

    if (menu) {
        const nav = getElement('nav', ['menu-list']);
        const allMenuLinks = menu.map(item => {
            const menuLink = getElement('a', ['menu-link'], {
                href: item.link,
                textContent: item.title,
            });

            return menuLink;
        });

        nav.append(...allMenuLinks);
        wrapperHeader.append(nav);
    }

    if (social) {
        const socialWrapper = getElement('div', ['social']);
        const allSocial = social.map(item => {
            const socialLink = getElement('a', ['social-link']);
            socialLink.append(getElement('img', [], {
                src: item.image,
                alt: item.title
            }));

            socialLink.href = item.link;

            return socialLink ;
        });

        socialWrapper.append(...allSocial);
        wrapperHeader.append(socialWrapper);
    }

    if (burger) {
		container.append(burgerButton);
    }

    header.append(container);
    container.append(wrapperHeader);

    return header;
};

const createMain = ({ 
    title, 
    main: { genre, rating, description, trailer, slider }}) => {
    const main = getElement('main');
    const container = getElement('div', ['container']); 
    const wrapper = getElement('div',['main-content']);
    const content = getElement('div',['content']);

    if (genre) {
        const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'],
        {textContent: genre});

        content.append(genreSpan);
    }

    if (rating) {
        const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
        const ratingStars = getElement('div', ['rating-stars']);
        const ratingNumber = getElement('div', ['rating-number'], {
            textContent: `${rating}/10`
        });

        main.append(container);
        container.append(wrapper);
        wrapper.append(content);

        for (let i = 0; i < 10; i++) {
            const star = getElement('img', ['star'], {
                alt: i ? '' : `Рейтинг ${rating} из 10`,
                src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
            });

            ratingStars.append(star);
        }

        ratingBlock.append(ratingStars, ratingNumber);
        content.append(ratingBlock);
    }

    content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], { textContent: title }));

    if (description) {
        content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {
            textContent: description,
        }));
    }

    if (trailer) {
        const youtubeLink = getElement('a', 
            ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
                href: trailer,
                textContent: 'Смотреть трейлер',
            });

        const youtubeImgLink = getElement('a', ['play', 'youtube-modal'], {
            href: trailer,
            ariaLabel: 'Смотреть трейлер',
        });    

        const iconPlay = getElement('img', ['play-img'], {
            src: 'img/play.svg',
            alt: '',
            ariaHidden: true, 
        });

            content.append(youtubeLink);
            youtubeImgLink.append(iconPlay);
            wrapper.append(youtubeImgLink); 
    }

    if (slider) {
        const sliderBlock = getElement('div', ['series']);
        const swiperBlock = getElement('div', ['swiper-container']);
        const swiperWrapper = getElement('div', ['swiper-wrapper']);
        const arrowBtn = getElement('button', ['arrow']);

        const slides = slider.map(item => {
            const swiperSlide = getElement('div', ['swiper-slide']);
            const card = getElement('figure', ['card']);
            const cardImg = getElement('img', ['card-img'], {
                src: item.img,
                alt: ((item.subtitle ? item.subtitle + ' ' : '') + ' ' + (item.title ? item.title : '').trim())
            });

            card.append(cardImg);

            if (item.title || item.subtitle) {
                const cardDescription = getElement('figcaption', ['card-description']);
                cardDescription.innerHTML = `
                    ${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
                    ${item.title ? `<p class="card-title">${item.title}</p>` : ''}
                `;

                card.append(cardDescription);
            }
            
            swiperSlide.append(card);
            return swiperSlide;
        });

        swiperWrapper.append(...slides);
        swiperBlock.append(swiperWrapper);
        sliderBlock.append(swiperBlock, arrowBtn);
        
        container.append(sliderBlock);

        new Swiper(swiperBlock, {
            loop: true,
            navigation: {
                nextEl: arrowBtn,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                541: {
                    slidesPerView: 2,
                    spaceBetween: 40
                }
            }
        });
    }

    return main;
};

const createFooter = ({ title, footer: { copyright, menu } }) => {
    const footer = getElement('footer', ['footer']);
    const container = getElement('div', ['container']);
    footer.append(container);
    const footerContent = getElement('div', ['footer-content']);
    container.append(footerContent);
    const leftPart = getElement('div', ['left']);
    const rightPart = getElement('div', ['right']);

    if (copyright) {
        const copyrightSpan = getElement('span', ['copyright'], {
            textContent: copyright
        });
        leftPart.append(copyrightSpan);
    }

    if (menu) {
        const footerMenu = getElement('nav', ['footer-menu']);
        const menuLinks = menu.map(item => {
            const menuLink = getElement('a', ['footer-link'], {
                href: item.link,
                textContent: item.title,
            });

            return menuLink;
        });

        footerMenu.append(...menuLinks);
        rightPart.append(footerMenu);
        footerContent.append(leftPart, rightPart);
    }

    return footer;
};

const movieConstructor = (selector, options) => {
    const app = document.querySelector(selector);
    app.classList.add('body-app');

    app.style.color = options.fontColor || '';
    app.style.backgroundColor = options.backgroundColor || '';

    if (options.subColor) {
        document.documentElement.style.setProperty('--sub-color', options.subColor);
    }

    app.style.backgroundImage = options.background ? `url('${options.background}')` : '';

    if (options.favicon) {
        const index = options.favicon.lastIndexOf('.');
        const type = options.favicon.substring(index + 1);

        const favicon = getElement('link', null, {
            rel: 'icon',
            href: options.favicon,
            type: 'image/' + (type === 'svg' ? 'svg-hml' : type)
        });

        document.head.append(favicon);
    }

    document.title = options.title;

    if (options.header) {
        app.append(createHeader(options));
    }

    if (options.main) {
        app.append(createMain(options));
    }

    if (options.footer) {
        app.append(createFooter(options));
    }
};

burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('menu-button-active');
    wrapperHeader.classList.toggle('header-active');
});

movieConstructor('.app', {
    title: 'Ведьмак',
    favicon: 'witcher/logo.png',
    fontColor: '#FFFFFF',
    background: 'witcher/background.jpg',
    backgroundColor: '#141218',
    subColor: '#9D2929',
    header: {
        logo: 'witcher/logo.png',
        social: [
            {
                title: 'Twitter',
                link: 'https://twitter.com',
                image: 'witcher/social/twitter.svg',
            },
            {
                title: 'Instagram', 
                link: 'https://instagram.com',
                image: 'witcher/social/instagram.svg',
            },
            {
                title: 'Facebook',
                link: 'https://facebook.com',
                image: 'witcher/social/facebook.svg',
            }
        ],
        menu: [
            {
                title: 'Описание',
                link: '#',
            },
            {
                title: 'Трейлер',
                link: '#',
            },
            {
                title: 'Отзывы',
                link: '#',
            },
        ],
        burger: {
            button: ''
        }
    },
    main: {
        genre: '2019, фэнтези',
        rating: '8',
        description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
        trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
        slider: [
            {
                img: 'witcher/series/series-1.jpg',
                title: 'Начало конца',
                subtitle: 'Серия №1',
            },
            {
                img: 'witcher/series/series-2.jpg',
                title: 'Четыре марки',
                subtitle: 'Серия №2',
            },
            {
                img: 'witcher/series/series-3.jpg',
                title: 'Предательская луна',
                subtitle: 'Серия №3',
            },
            {
                img: 'witcher/series/series-4.jpg',
                title: 'Банкеты, ублюдки и похороны',
                subtitle: 'Серия №4',
            },
        ]
    },
    footer: {
        copyright: '© 2020 The Witcher. All right reserved.',
        menu: [
            {
                link: '#',
                title: 'Privacy Policy'
            },
            {
                link: '#',
                title: 'Terms of Service'
            },
            {
                link: '#',
                title: 'Legal'
            },
        ]
    }
});