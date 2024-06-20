use std::error::Error;

use proto::greeting_client::GreetingClient;

mod proto {
    tonic::include_proto!("greeting");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let url = "http://localhost:50051";
    let mut client = GreetingClient::connect(url).await?;

    let req = proto::GreetingRequest {
        name: "Jammin".to_string(),
    };
    let t_req = tonic::Request::new(req);

    let res = client.greeting(t_req).await?;

    println!("Response: {:?}", res.get_ref().greeting);

    return Ok(());
}
