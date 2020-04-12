import Switch from 'react-switch';
import { withTheme } from 'styled-components';
import Container from '../components/Container';
import ContentWrapper from '../components/ContentWrapper';
import Header from '../components/Header';
import { Select } from '../components/Select';
import { withAuthSync } from '../util/auth';
import { themes, useTheme } from '../util/themes';

const Settings = () => {
    const themeContext = useTheme();

    return (
        <Container>
            <Header />
            <ContentWrapper>
                <p>Tema</p>
                <Select
                    placeholder="Velg tema"
                    options={themes}
                    value={themes.filter(
                        (opt) => opt.value === themeContext.theme
                    )}
                    onChange={(value, _) =>
                        themeContext.changeTheme(value?.value)
                    }
                />
                <p>Dark Mode</p>
                <Switch
                    onChange={themeContext.toggleDarkMode}
                    checked={themeContext.isDarkMode}
                    uncheckedIcon={false}
                    checkedIcon={false}
                />
            </ContentWrapper>
        </Container>
    );
};

export default withAuthSync(withTheme(Settings));
