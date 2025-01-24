export interface GlobalQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export interface ShareDialogProps {
  item: any;
  onClose: () => void;
}

export interface ChartConfig {
  data: any;
  options: any;
}

export interface UserDetails {
  balance: number;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
}
