import { ViewBaseProps } from "../../../Internalization/ViewBaseProps";
import { useAuthStore } from "../../../Store/authStore";
import { Person } from "../../../Types/Person";

export const Home: React.FC<ViewBaseProps> = ({ formatText }) => {
    const person: Person = useAuthStore((state: any) => state.person);
    return (
        <div>
        <h1>{person.name}</h1>
        </div>
    );
}