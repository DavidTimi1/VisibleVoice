
import slImg from './imgs/images.png';
import ttsImg from './imgs/tts-img.png'

import { useEffect, useRef, useState, forwardRef } from "react";

import { readElement, signElement, speechSyn } from './webEx/popup';
import { IconBut } from './ui/buttons';
import { ASL } from './App';
import { $, on, once, transitionEnd } from './ui/helpers';


// Define a callback function that will be called when the target element's visibility changes
const observerCallback = (entries, observer) => {
	entries.forEach(entry => {
		const { target, isIntersecting } = entry;

		target.dispatchEvent(
			new Event(isIntersecting ? 'scrolledIntoView' : 'scrolledOutofView', {
				details: entry
			})
		)
	});
};

// Create a new IntersectionObserver instance and pass the callback function
export const observer = new IntersectionObserver(observerCallback, {
	root: null, // Use the viewport as the root
	rootMargin: '0px', // Margin around the root
	threshold: 0.5 // 10% of the element's visibility triggers the callback
});



export function BgImg({ src, inline, children, style }) {
	let styles = { backgroundImage: `url(${src})` };
	if (inline) {
		styles = { ...styles, width: "1.5em", aspectRatio: "1/1" }
	}
	styles = { ...styles, ...style }


	return (
		<div className={`bg-img ${inline ? '' : "max"}`} style={styles}>
			<div className='sr-only'>
				{children}
			</div>
		</div>
	)
}


export function FeatureEnabled({ children }) {
	// undefined - not this, false - paused, true - played
	const [state, setState] = useState({});
	const { read, sign } = state;
	const myRef = useRef(null);

	on("cancelled-asl", () => {
		sign && setState({ ...state, sign: false });
	})

	return (
		<div className='feat-cont' data-active={read || sign}>
			<div ref={myRef}>
				{children}
			</div>
			<div className='feat-imp flex-col abs'>
				<button className={`no-btn ${read ? 'on' : ''}`} onClick={() => toggleReading()}>
					<BgImg src={ttsImg} inline style={{ borderRadius: "5px", margin: "5px" }}>
						Text to Speech
					</BgImg>
				</button>
				<button className={`no-btn ${sign ? 'on' : ''}`} onClick={() => toggleSigning()}>
					<BgImg src={slImg} inline style={{ borderRadius: "5px", margin: "5px" }}>
						Text to hand signals
					</BgImg>
				</button>
			</div>
		</div>
	)

	function thisElem() {
		if (!myRef.current)
			throw Error("Ref has no value")
		return myRef.current;
	}

	function toggleReading() {
		const curState = state;

		if (read) {
			if (speechSyn.speaking) speechSyn.pause();

			setState({ ...curState, read: false });

		} else {
			// if undefined cancel what was prev being read
			read !== false && speechSyn.cancel();

			if (speechSyn.paused) {
				speechSyn.resume();

			} else {
				readElement(thisElem())
					.then(_ => {
						setState({ ...curState, read: false });
					})
			}

			setState({ ...curState, read: true });

		}

	}

	function toggleSigning() {
		const curState = state;

		if (sign) {
			if (ASL.signing) ASL.stop();
			setState({ ...curState, sign: false });

		} else {
			signElement(thisElem())
				.then(_ => {
					setState({ ...curState, sign: false });
				})

			setState({ ...curState, sign: true });

		}

	}

}


export function ASLPIP({ closeModal, data }) {
	const [maxSize, setMaxSize] = useState(true);
	const vidElem = useRef(null);
	const mainRef = useRef(null);

	useEffect(() => {
		const el = mainRef.current;
		ASL.register(vidElem.current);

		const t_id = setTimeout(() => {
			el.classList.remove("close");

			// hide the controls after 3s
			setTimeout(() => {
				const ctrlElem = $("q.controls", el);
				ctrlElem.style.opacity = ctrlElem.style.visibility = '';
			}, 3000);
		}, 50);

		return () => clearTimeout(t_id);
	}, [])

	useEffect(() => {
		toASL(data);
	}, [data])


	// on('play-asl', ({detail}) => {
	// 	console.log("want me to play", detail, "?");
	// 	toASL(detail);
	// });

	on('cancelled-asl', () => {
		const el = mainRef.current;

		if (el) {
			once(transitionEnd, el, closeModal);
			el.classList.add("close");
		}
	})


	return (
		<div id="p-i-p" className='close' ref={mainRef} style={{ ...(maxSize ? {} : { transform: "scale(.75)" }) }}>
			<div className='content max'>
				<div className='cinema max'>
					<video className="fh" poster={slImg} ref={vidElem} src="" style={{ left: "50%", transform: "translateX(-50%)" }}>

					</video>
				</div>
				<div className='controls abs fw' style={{ opacity: 1, visibility: "visible" }}>
					<div className='flex fw' style={{ padding: "5px", justifyContent: "space-between" }}>
						{
							maxSize ?
								<IconBut className="fa-solid fa-minimize fa-lg" onClick={() => setMaxSize(false)}>
									<span className='sr-only'>Reduce size</span>
								</IconBut>
								:
								<IconBut className="fa-solid fa-maximize fa-lg" onClick={() => setMaxSize(true)}>
									<span className='sr-only'>Increase size</span>
								</IconBut>
						}

						<IconBut className="fa-solid fa-xmark fa-lg" onClick={close}>
							<span className='sr-only'>Stop</span>
						</IconBut>
					</div>
				</div>
			</div>
		</div>
	)


	function toASL(sentence) {
		const words = sentence.split(' '), player = () => vidElem.current;
		let index = 0;

		function gen() {
			if (index > words.length - 1) {
				// alert that it is done
				ASL.end();
				return
			}

			let word = words[index].toLowerCase();
			word = word.slice(-1) === '.' ? word.slice(0, -1) : word;


			if (word) {
				console.log(word);
				let vidSrc = `https://media.signbsl.com/videos/asl/startasl/mp4/${word}.mp4`;
				player().src = vidSrc;

				player().load();
				player().play().then(() => {
					console.log("playing")

				}).catch(err => {
					console.error("Error playing video", err);

					++index;
					gen();
				})
			} else {
				console.log("Nothing here!")
				++index;
				gen()
			}
		}

		on('ended', player(), () => {
			++index;
			player().src = '';
			gen();
		})

		gen()

	}

	function close() {
		ASL.stop();
	}

}


export const Input = forwardRef((props, ref) => {
	let { autoFocus, className, label, id, required, type, name, rows } = props;
	required = required ?? (label.slice(-1) === '*');
	type = type ?? "text"

	if (!rows) {
		return (
			<div className="form-floating fw">
				<input {...{ autoFocus, id, required, type, name, placeholder: label }} className={`form-control br-5 ${className ? className : ''}`} ref={ref}></input>
				<label htmlFor={id} style={{ color: "grey" }}> {label} </label>
			</div>
		)
	}

	return (
		<div className="form-floating fw">
			<textarea {...{ autoFocus, id, required, name, rows, placeholder: label }} className={`form-control br-5 ${className ? className : ''}`} ref={ref} style={{ height: "unset" }}></textarea>
			<label htmlFor={id} style={{ color: "grey" }}> {label} </label>
		</div>
	)

})
