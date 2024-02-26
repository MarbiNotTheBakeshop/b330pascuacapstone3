import {Container, Row, Col, Card} from 'react-bootstrap';
import './Highlights.css'; // Import the CSS file
export default function Highlights(){
	
	return(
		<Container className="mt-5 ">
			<Row className = "d-flex justify-content-center ">
				<Col className = "col-3 ">
					<Card>
					      <Card.Body>
					        <Card.Title>Coffee to your doorstep</Card.Title>
					        
					        <Card.Text>
							At nang katol jutay at bakit tetetet sa intonses shokot ang ang nakakalurky thunder waz tetetet waz katol katagalugan at ang na kemerloo kasi warla tungril kasi matod chapter ng kirara dites shonget.
					        </Card.Text>
					      </Card.Body>
					</Card>

				</Col>

				<Col className = "col-3">
					<Card>
					      <Card.Body>
					        <Card.Title>Less than 30 mins delivery</Card.Title>
					        
					        <Card.Text>
							Planggana otoko at 48 years dites waz at bakit kasi keme keme ng at ang , na ang kemerloo nang ng ng otoko nang keme keme emena gushung chopopo na ang ang Mike kabog buya ng ang ang. 
					        </Card.Text>
					      </Card.Body>
					</Card>
				</Col>

				<Col className = "col-3">
					<Card>
					      <Card.Body>
					        <Card.Title>Quality Ingridients</Card.Title>
					        
					        <Card.Text>
							Chapter wasok at bakit sa at chopopo na ang bigalou wasok lulu shonget dites fayatollah kumenis ang at nang mabaho kemerloo na bakit urky thunder na at ang kemerloo balaj ano majubis ang tetetet keme keme.
					        </Card.Text>
					      </Card.Body>
					</Card>

				</Col>
			</Row>
		</Container>
		);
}