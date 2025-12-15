import { Type_Cart_Status } from "./cart";
import { Roles } from "./roles";

type UserData = {
    userId: string
    email: string;
    role: Roles;
}

export interface Session {
  sessionId: string;
  expiresAt: Date;
  cart_status: Type_Cart_Status;
  user: UserData | null
}

// Helper para verificar sessão válida
export function isValidSession(session: Session): boolean {
  return session && new Date() < new Date(session.expiresAt);
}

/* 

- verifica se o usuário já está logado e se existe session no navegador
    - se já estiver logado e se já existe session (ela já deve conter o userId)
    - se já estiver logado e se não existe session ou se a mesma está expirada, cria uma nova e atribui ao usuário logado
    - se não tiver usuário logado, mas existe session
        - verifica a validade (expiração)
        - se for válida continua
        - senão cria outra nova
            - atualizar o status do carrinho anterior para abandonado
            - limpa o carrinho atual

primeiro acesso: 
- cria session, como visitante, ao acessar o / ou qualquer rota do site --> carrinho vazio
    - se o usuário adicionar itens ao carrinho
        - atribui a session de visitante ao carrinho
    - se o usuário logar/se registrar
        - atribui a session a ele
        - se houver carrinhos com a session
            - atribui o mesmo ao usuário
        - se o usuário se deslogar
            - remove o session do navegador
            - limpa o carrinho (do navegador apenas)
            - cria outra session

do segundo acesso adiante:
- usuário acessa qualquer rota do site:
    - verifica se há session válida ou existente no navegador
        - se não houver ou se estiver expirada
            - cria nova
            - verificar se há carrinhos ativos/abandonados (pelo sessionId)
                - se houver
                    - exibir mensagem ao visitante informando que sua sessão anterior expirou, 
                    que há itens no carrinho e se deseja mantê-los
                        - se sim
                            - cria novo carrinho com a nova session
                        - senão
                            - o carrinho ficará como órfão no banco
                            - programar um cleanup job para limpar os carrinhos órfãos após 30 dias
        - se houver e estiver ativa
            - verificar se há carrinhos ativos/abandonados (pelo sessionId)
                - listar, se houver
    - verifica se há usuário logado
        - se houver
            - verificar se tem carrinhos ativos ou abandonados (pelo userId)
                - se houver
                    - listar os itens
        - senão
            - verificar se tem carrinhos ativos ou abandonados (pelo sessionId)
                - se houver
                    - listar os itens


sessions (será usada apenas para manutenção dos carrinhos de visitantes)
- com usuário logado
    - com carrinho
        - não faz nada
    - sem carrinho
        - não faz nada
    - ao deslogar
        - não faz nada
- sem usuário logado (visitante)
    - com carrinho
        - atribui a sessionId ao carrinho
    - sem carrinho
        - não faz nada
    - ao logar
        - com carrinho
            - atribui o userId ao carrinho com sessionId
        - sem carrinho
            - não faz nada


carrinhos
- com usuário logado
    - buscar carrinhos pelo userId
        - se houver
            - listar os itens
- sem usuário logado
    - buscar carrinhos pelo sessionId
        - se houver
            - listar os itens

- os carrinhos serão criados a partir dos sessionIds
- quando houver usuário logado, será atribuído também o userId ao carrinho
- quando a sessionId expirar
    - se tiver usuário atribuído
        - renova a sessionId, mas mantém o sessionId do carrinho
    - se não tiver usuário atribuído
        - carrinho com ou sem itens, é abandonado no banco, para limpeza posterior

*/