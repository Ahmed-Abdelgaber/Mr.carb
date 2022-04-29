import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealsItem from './MealItems/MealsItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = props => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch(
                'https://mrcarb-cedb4-default-rtdb.firebaseio.com/meals.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!!!! 💔💔');
            }

            const responseData = await response.json();
            let receivedMeals = [];

            for (const key in responseData) {
                receivedMeals.push({
                    ...responseData[key],
                    id: key,
                });
            }

            setMeals(receivedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHasError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes['loading-message']}>
                <p>Loading..... 🙄🙄</p>
            </section>
        );
    }

    if (hasError) {
        return (
            <section className={classes['error-message']}>
                <p>{hasError}</p>
            </section>
        );
    }

    const renderedMeals = meals.map(meal => {
        return (
            <MealsItem
                key={meal.id}
                id={meal.id}
                price={meal.price}
                name={meal.name}
                description={meal.description}
            />
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{renderedMeals}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
