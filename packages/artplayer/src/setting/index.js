import { setStyle } from '../utils';
import component from '../utils/component';
import flip from './flip';

export default class Setting {
    constructor(art) {
        this.id = 0;
        this.art = art;
        this.state = false;
        if (art.option.setting) {
            this.art.on('firstCanplay', () => {
                this.init();
            });

            this.art.on('blur', () => {
                this.hide();
            });
        }
    }

    init() {
        const {
            template: { $setting },
            events: { proxy },
        } = this.art;

        proxy($setting, 'click', e => {
            if (e.target === $setting) {
                this.hide();
            }
        });

        this.add(
            flip({
                disable: false,
                name: 'flip',
                index: 10,
            }),
        );
    }

    add(item, callback) {
        this.id += 1;
        const { $settingBody } = this.art.template;
        return component(this.art, this, $settingBody, item, callback, 'setting');
    }

    show() {
        const { $setting } = this.art.template;
        setStyle($setting, 'display', 'flex');
        this.state = true;
        this.art.emit('setting:show', $setting);
    }

    hide() {
        const { $setting } = this.art.template;
        setStyle($setting, 'display', 'none');
        this.state = false;
        this.art.emit('setting:hide', $setting);
    }

    toggle() {
        if (this.state) {
            this.hide();
        } else {
            this.show();
        }
    }
}
