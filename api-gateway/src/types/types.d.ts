interface ProxyConfig {
  target: string;
  changeOrigin: boolean;
  pathRewrite?: Record<string, string>;
  ws?: boolean;
}
