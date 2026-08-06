import styleDark from "./ThemeCardDark.module.css";
import styleLight from "./ThemeCardLight.module.css";



const ThemedCard = ({ title, description, theme }) => {
    // Selecionar o CSS Module com base na prop theme
    const styles = theme === "light" ? styleLight : styleDark;
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default ThemedCard;

