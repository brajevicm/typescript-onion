export class NotFoundException extends Error {
  constructor(id: number) {
    super(`Resource ${id} not found!`);
    this.name = 'NotFoundException';
  }
}
