type ResultValue = {
    data: any
    status: string
    message: string
    isError: boolean
}

interface IResultEntity {
    resultValue :ResultValue
}

export class ResultEntity{
    
    private resultValue :ResultValue

    constructor() {
        this.resultValue = {
            data: null,
            status: "0000",
            message: "",
            isError: false
        }
    }

    public setData(data: any): void {
        this.resultValue.data = data
    }

    public setError(status: string, message: string = ""): void {
        this.resultValue.status = status

        if(message === "") {
            message = this.getErrorMessage(status)
        }

        this.resultValue.message = message        
    }

    public result(): ResultValue {
        
        this.resultValue.isError = this.isErrorMessage()

        return this.resultValue
    }

    private isErrorMessage(): boolean {
        let isError: boolean = false

        switch (this.resultValue.status) {
            case "E4000":
                isError = true
            break;
        }

        return isError
    }

    private getErrorMessage(status: string): string {

        let message: string = ""

        switch (status) {
            case "E4000":
                message = "No data was found"
            break;
        }

        return message
    }
}