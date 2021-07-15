import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar(propriedades) {
  return(
    <Box>
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

export default function Home() {
  React.useState();
  const usuarioAleatorio = 'LukasWyver';
  const comunidades = ['Alurakut'];
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
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();

                comunidades.push('Alura Stars');
                console.log(comunidades);
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

          <ProfileRelationsBoxWrapper>
                <ul>
                  {comunidades.map((itemAtual) => {
                      return (
                      <li>
                          <a href={`/user/${itemAtual}`} key={itemAtual}>
                            <img src={`https://placehold.it/300x300`} />
                            <span>{itemAtual}</span>
                          </a>
                      </li>
                      )
                    })}
                </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                  return (
                   <li>
                      <a href={`/user/${itemAtual}`} key={itemAtual}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
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