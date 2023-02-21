import { ViewBaseProps } from "../../../Internalization/ViewBaseProps";

export const Home: React.FC<ViewBaseProps> = ({ formatText }) => {
    return (
        <div>
        <h1>{formatText("test")}</h1>
        </div>
    );
}