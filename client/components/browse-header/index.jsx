import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ROUTES } from '../../Shared/Constants'
import {Header} from '../index'
const BrowseHeader=({logo,category,searchTerm,setSearchTerm,setCategory,session,getContent})=>{
    let router = useRouter()
    return  <Header src="joker1" dontShowOnSmallViewPort>
            <Header.Frame>
            <Header.Group>
                <Header.Logo to={ROUTES.HOMEPAGE} src={`/logo.svg`} alt="Netflix" />
                <Header.TextLink marginLeft={'10rem'} active={category === 'series' ? 'true' : 'false'} onClick={() => setCategory('series')}>
                Series
                </Header.TextLink>
                <Header.TextLink marginLeft={'15rem'} active={category === 'films' ? 'true' : 'false'} onClick={() => setCategory('films')}>
                Films
                </Header.TextLink>
            </Header.Group>
            <Header.Group>
                <Header.Search getContent={getContent} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Header.Profile>
                {!session && <Header.ButtonLink onClick={() =>router.push('/login')}>Sign In</Header.ButtonLink>}
                {session && 
                <>
                    <Header.Picture src={`1`} />
                    <Header.Dropdown>
                        <Header.Group>
                        <Header.Picture src={`1`} />
                        <Header.TextLink>{session?.user?.username}</Header.TextLink>
                        </Header.Group>
                        <Header.Group>
                        <Header.TextLink onClick={() => signOut()}>Sign out</Header.TextLink>
                        </Header.Group>
                    </Header.Dropdown>
                </>}
                </Header.Profile>
            </Header.Group>
            </Header.Frame>

            <Header.Feature>
            <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
            <Header.Text>
                Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham
                City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a
                futile attempt to feel like he's part of the world around him.
            </Header.Text>
            <Header.PlayButton>Play</Header.PlayButton>
            </Header.Feature>
  </Header>
}
export default BrowseHeader