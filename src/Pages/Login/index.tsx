import {
    Row,
    Col,
    Button,
    Typography,
    Layout,
    Space,
} from 'antd';
import {
    InstagramFilled
} from '@ant-design/icons';
// @ts-ignore
import InstagramLogin from 'react-instagram-login';
import './index.css';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Store/Modules/auth';
import { Navigate } from 'react-router-dom';

const {
    Title,
    Paragraph,
} = Typography;
function Login() {
    const dispatch = useDispatch();
    function responseInstagram(res: string): void {
        dispatch(setToken(dispatch, res));
        <Navigate to='/' />
    }

    return (
        <>
            <Row justify="center" align="middle">
                <Col style={{position: 'absolute', top: '30%'}}>
                    <Title style={{textAlign: 'center'}}>Sign in</Title>
                    <Paragraph>Currently we only authorize from Instagram</Paragraph>
                    <Row justify="center" align="middle">
                        <Col>
                            <InstagramLogin
                                clientId="512475150184421"
                                scope={'user_profile,user_media'}
                                onSuccess={responseInstagram}
                                onFailure={responseInstagram}>
                                <InstagramFilled />
                                Instagram
                            </InstagramLogin>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
export default Login;