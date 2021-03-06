import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar(propriedades) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr /> 
      <p>
        <a 
            className="boxLink" 
            href={`https://github.com/${propriedades.githubUser}`} 
          >
            @{propriedades.githubUser}
          </a>
      </p>
      <hr /> 

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
          {propriedades.title} ({propriedades.items.length})
      </h2>
      {/* <ul>
        {seguidores.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                  <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                  </a>
              </li>
            )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'LukasWyver';
  const [ comunidades, setComunidades ] = React.useState([]);
  
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    // 'rafaballerini',
    'marcobrunodev',
    // 'felipefialho',
    'diulianovenancio',
    'BarbosaWagner',
    // 'MateusCampoSantos'
  ]
    const [seguidores, setSeguidores] = React.useState([]);

    React.useEffect(function(){
      //GET
      fetch('https://api.github.com/users/LukasWyver/followers')
      .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
      })  
      .then(function(respostaCompleta){
        setSeguidores(respostaCompleta);
      })
      // API GraphQL Token: d7f89b14082f84236659980577b8b6
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers:{
          'Authorization': 'd7f89b14082f84236659980577b8b6',
          'Content-Type': 'application/json',
          'Accept': 'application/json' ,
        },
        body: JSON.stringify({ "query":`query{
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }` })
      })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })
    }, [])

    console.log('seguidores antes do return: ', seguidores);

  return(
    <>
    <AlurakutMenu />
      <MainGrid>
        {/* ============================= PERFIL  */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        {/* ========================== BEM VINDO  */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box className="title">
            <h1>
              Bem vindo (a)
            </h1>
            <OrkutNostalgicIconSet />            
          </Box>

          {/* ====================== FORMULARIO  */}
          <Box>
            <h2 className="subTitle">O que voc?? deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                
                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)                
            }}>
              <div>
                <input 
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="title" 
                    area-label="Qual vai ser o nome da sua comunidade?"
                    type="text"
                  />
              </div>
              <div>  
                  <input 
                    placeholder="Coloque uma URL para usarmos de capa"
                    name="image" 
                    area-label="Coloque uma URL para usarmos de capa"
                    type="text"
                  />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        

        {/* ============================ AMIGOS  */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores"  items={seguidores}/>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                  return (
                   <li key={itemAtual}>
                      <a href={`/users/${itemAtual}`}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                   </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
             Minhas comunidades ({comunidades.length})
            </h2>
              <ul>
                {comunidades.map((itemAtual) => {
                      return (
                      <li key={itemAtual.id}>
                          <a href={`/users/${itemAtual.title}`}>
                            {/* <img src={`https://via.placeholder.com/300x300`} /> */}
                            {/* <img src={`https://picsum.photos/300/300`} /> */}
                            <img src={itemAtual.image} />
                            <span>{itemAtual.title}</span>
                          </a>
                      </li>
                    )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>
        </div>
        
      </MainGrid>   
    </>
    );
}