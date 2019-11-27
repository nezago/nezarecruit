const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: path.join(__dirname, "."),
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: ["file-loader"]
      }
    ]
  }
};
