/* new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
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

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
}) */

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
    main: { genre, rating, description, trailer }}) => {
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

    return main;
};

const movieConstructor = (selector, options) => {
    const app = document.querySelector(selector);
    app.classList.add('body-app');

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
};

burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('menu-button-active');
    wrapperHeader.classList.toggle('header-active');
});

movieConstructor('.app', {
    title: 'Ведьмак',
    favicon: 'witcher/logo.png',
    background: 'witcher/background.jpg',
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
    }
});