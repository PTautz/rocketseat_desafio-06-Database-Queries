import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository'

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private repositoryUser: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.repositoryUser = getRepository(User)
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .where('title ILIKE :id', {id: '%'+param+'%' }).getMany(); // % pesquisa antes e/ou depois da string de busca
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // CONTA QNTS IDS DISTINTOS TEM NA TABELA
    return this.repository.query(`SELECT COUNT(DISTINCT id) FROM public.games;`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repositoryUser
      .createQueryBuilder("users")
      .innerJoinAndSelect("users.games", "games")
      .where("games.id = :gamesId", {gamesId: id})
      .getMany();
  }

  // async findUsersByGameId(id: string): Promise<User[]> {
  //   return this.repository
  //     .createQueryBuilder("games")

  //     .relation("games", "users")

  //     .of(id)

  //     .loadMany();

  // }
     
  }

