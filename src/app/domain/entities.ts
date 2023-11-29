export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly logo: string,
    public readonly releaseDate: Date,
    public readonly revisionDate: Date
  ) {}
}
