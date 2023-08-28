export class AuthorsSevice{
    
    authorsname = ["Author 1","Author 2", "Author 3"];

    getAuthor(){
        return this.authorsname;
    }

    getAuthorNo(){
        return this.authorsname.length;
    }
}