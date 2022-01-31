import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return await this.repository.findOneOrFail({
      where: { id: user_id},
      relations: ['games']
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query( `SELECT id, first_name, last_name, email, created_at, updated_at
    FROM public.users order by first_name asc;`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT id, first_name, last_name, email, created_at, updated_at
    FROM public.users 
    WHERE LOWER(first_name) LIKE '%${first_name.toLowerCase()}%' OR LOWER(last_name) LIKE '%${last_name.toLowerCase()}%'
    order by first_name asc;`); // Complete usando raw query
  }
}
