import { useRecoilValue } from "recoil";
import { userTokens } from "../state/atoms";
import { Card, Row } from 'react-bootstrap';

export const UserTokens = () => {
    const userTokensList = useRecoilValue(userTokens);

    const descriptionToPrettier = (description: string) => {
        const descriptions: string[] = [];
        const data = JSON.parse(description) as any;
        const keys = Object.keys(data);

        for (const key of keys) {
            if(key==='passPhrase') continue;
            
            descriptions.push(`${key}: ${data[key]}`)
        }
        return descriptions;
    }

    return <div>
        <b>My Documents:</b>
        <Row >
            {
                userTokensList && userTokensList.map(token =>
                    <Card className="m-4" key={token.image} style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={token.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} />
                        <Card.Body>
                            <Card.Title>{token.name}</Card.Title>
                            {
                                descriptionToPrettier(token.description).map(desc => <Card.Text>{desc}</Card.Text>)
                            }
                        </Card.Body>
                    </Card>)
            }
        </Row>
    </div>
}