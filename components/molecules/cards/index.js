import React from 'react';

const Cards = () => {

	return (
		<>
			<section id="one" class="wrapper style2 spotlights">
				<section>
					<a href="#" class="image"><img src="images/pic01.jpg" alt="" data-position="center center" /></a>
					<div class="content">
						<div class="inner">
							<h2>Sed ipsum dolor</h2>
							<p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus.</p>
						</div>
					</div>
				</section>
			</section>
			<section id="two" class="wrapper style3 fade-up">
				<div class="inner">
					<h2>What we do</h2>
					<p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
					<div class="features">
						<section>
							<span class="icon solid major fa-code"></span>
							<h3>Lorem ipsum amet</h3>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<span class="icon solid major fa-lock"></span>
							<h3>Aliquam sed nullam</h3>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<span class="icon solid major fa-cog"></span>
							<h3>Sed erat ullam corper</h3>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<span class="icon solid major fa-desktop"></span>
							<h3>Veroeros quis lorem</h3>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<span class="icon solid major fa-link"></span>
							<h3>Urna quis bibendum</h3>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
						<section>
							<span class="icon major fa-gem"></span>
							<h3>Aliquam urna dapibus</h3>
							<p>Phasellus convallis elit id ullam corper amet et pulvinar. Duis aliquam turpis mauris, sed ultricies erat dapibus.</p>
						</section>
					</div>
				</div>
			</section>
			<section id="three" class="wrapper style1 fade-up">
				<div class="inner">
					<div class="row gtr-uniform">
						<div class="col-3">
							<h2>Get in touch</h2>
						</div>
						<div class="col-8">
							<div class="coffe-img">
								<div class="cup">
									<img class="mug" src="./images/mug.svg" alt="mug icon" />
									<span class="smoke" />
								</div>
							</div>
						</div>
					</div>
					<p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit quis lorem.</p>
					<div class="split style1">
						<section>
							<form method="post" action="#">
								<div class="fields">
									<div class="field half">
										<label for="name">Name</label>
										<input type="text" name="name" id="name" />
									</div>
									<div class="field half">
										<label for="email">Email</label>
										<input type="text" name="email" id="email" />
									</div>
									<div class="field">
										<label for="message">Message</label>
										<textarea name="message" id="message" rows="5"></textarea>
									</div>
								</div>
								<ul class="actions">
									<li><a href="" class="button submit">Send Message</a></li>
								</ul>
							</form>
						</section>
						<section>
							<ul class="contact">
								<li>
									<h3>Email</h3>
									<a href="#">jacobsenanaizabel@gmail.com</a>
								</li>
								<li>
									<h3>Social</h3>
									<ul class="icons">
										<li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
										<li><a href="#" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
									</ul>
								</li>
							</ul>
						</section>
					</div>
				</div>
			</section>
		</>
	)
}

export default Cards;